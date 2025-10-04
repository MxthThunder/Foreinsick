import { useEffect, useRef, useState } from 'react';
import cytoscape, { Core, NodeSingular, EdgeSingular } from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { GraphData, GraphNode, GraphEdge, NODE_COLORS, NodeType } from '@/types/graph';
import NodeDetailSidebar from '@/components/graph/NodeDetailSidebar';
import EdgeDetailPopup from '@/components/graph/EdgeDetailPopup';

cytoscape.use(coseBilkent);

interface NetworkGraphProps {
  data: GraphData;
  timeFilter?: Date | null;
  activeCluster?: NodeType | null;
  pathHighlight?: { source: string; target: string } | null;
}

export default function NetworkGraph({ data, timeFilter, activeCluster, pathHighlight }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GraphEdge | null>(null);
  const [edgePopupPos, setEdgePopupPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const filteredData = {
      nodes: timeFilter
        ? data.nodes.filter(n => !n.timestamp || n.timestamp <= timeFilter)
        : data.nodes,
      edges: timeFilter
        ? data.edges.filter(e => !e.timestamp || e.timestamp <= timeFilter)
        : data.edges
    };

    const cy = cytoscape({
      container: containerRef.current,
      elements: [
        ...filteredData.nodes.map(node => ({
          data: {
            id: node.id,
            label: node.label,
            type: node.type,
            size: node.size,
            icon: node.icon,
            metadata: node.metadata,
            timestamp: node.timestamp
          }
        })),
        ...filteredData.edges.map(edge => ({
          data: {
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: edge.type,
            weight: edge.weight,
            edgeData: edge.data,
            timestamp: edge.timestamp
          }
        }))
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': (ele: NodeSingular) => NODE_COLORS[ele.data('type') as NodeType],
            'width': (ele: NodeSingular) => ele.data('size'),
            'height': (ele: NodeSingular) => ele.data('size'),
            'label': (ele: NodeSingular) => ele.data('label'),
            'text-valign': 'bottom',
            'text-halign': 'center',
            'text-margin-y': 8,
            'font-size': '12px',
            'font-weight': 600,
            'color': '#333333',
            'border-width': 3,
            'border-color': '#FFFFFF',
            'text-outline-width': 2,
            'text-outline-color': '#FFFFFF',
            'transition-property': 'background-color, border-color, border-width, opacity',
            'transition-duration': 300
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-color': '#FF9AA2',
            'border-width': 5
          }
        },
        {
          selector: 'node.faded',
          style: {
            'opacity': 0.05
          }
        },
        {
          selector: 'node.path-highlight',
          style: {
            'border-color': '#B565A7',
            'border-width': 6
          }
        },
        {
          selector: 'edge',
          style: {
            'width': (ele: EdgeSingular) => Math.max(2, Math.log(ele.data('weight') + 1) * 2),
            'line-color': '#A8A8A8',
            'target-arrow-color': '#A8A8A8',
            'target-arrow-shape': 'triangle',
            'arrow-scale': 1.2,
            'curve-style': 'bezier',
            'opacity': 0.6,
            'transition-property': 'line-color, width, opacity',
            'transition-duration': 300
          }
        },
        {
          selector: 'edge:selected',
          style: {
            'line-color': '#FF9AA2',
            'target-arrow-color': '#FF9AA2',
            'width': (ele: EdgeSingular) => Math.max(4, Math.log(ele.data('weight') + 1) * 2.5),
            'opacity': 1
          }
        },
        {
          selector: 'edge.faded',
          style: {
            'opacity': 0.1
          }
        },
        {
          selector: 'edge.path-highlight',
          style: {
            'line-color': '#B565A7',
            'target-arrow-color': '#B565A7',
            'width': (ele: EdgeSingular) => Math.max(5, Math.log(ele.data('weight') + 1) * 3),
            'opacity': 1
          }
        }
      ],
      layout: {
        name: 'cose-bilkent' as any,
        // The following options are specific to cose-bilkent but types may not include them; cast to any if needed.
        nodeDimensionsIncludeLabels: true as any,
        idealEdgeLength: 150 as any,
        edgeElasticity: 0.45 as any,
        nestingFactor: 0.1 as any,
        gravity: 0.4 as any,
        numIter: 2500 as any,
        animate: false as any,
        randomize: true as any
      },
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.2
    });

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const nodeData: GraphNode = {
        id: node.data('id'),
        label: node.data('label'),
        type: node.data('type'),
        size: node.data('size'),
        icon: node.data('icon'),
        metadata: node.data('metadata'),
        timestamp: node.data('timestamp')
      };

      setSelectedNode(nodeData);
      setSelectedEdge(null);
      setEdgePopupPos(null);

      cy.nodes().removeClass('faded');
      cy.edges().removeClass('faded');

      const connectedNodes = node.neighborhood().nodes().add(node);
      const unconnectedNodes = cy.nodes().difference(connectedNodes);
      unconnectedNodes.addClass('faded');

      const connectedEdges = node.connectedEdges();
      const unconnectedEdges = cy.edges().difference(connectedEdges);
      unconnectedEdges.addClass('faded');
    });

    cy.on('tap', 'edge', (evt) => {
      const edge = evt.target;
      const edgeData: GraphEdge = {
        id: edge.data('id'),
        source: edge.data('source'),
        target: edge.data('target'),
        type: edge.data('type'),
        weight: edge.data('weight'),
        data: edge.data('edgeData'),
        timestamp: edge.data('timestamp')
      };

      setSelectedEdge(edgeData);
      setSelectedNode(null);

      const renderedPosition = evt.renderedPosition || evt.position;
      setEdgePopupPos({
        x: renderedPosition.x,
        y: renderedPosition.y
      });

      cy.edges().removeClass('faded');
      cy.nodes().removeClass('faded');
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        setSelectedNode(null);
        setSelectedEdge(null);
        setEdgePopupPos(null);
        cy.nodes().removeClass('faded');
        cy.edges().removeClass('faded');
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [data, timeFilter]);

  useEffect(() => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    cy.nodes().removeClass('faded');
    cy.edges().removeClass('faded');

    if (activeCluster) {
      const clusterNodes = cy.nodes().filter((node: NodeSingular) => node.data('type') === activeCluster);
      const otherNodes = cy.nodes().difference(clusterNodes);
      otherNodes.addClass('faded');

      const clusterEdges = clusterNodes.connectedEdges();
      const otherEdges = cy.edges().difference(clusterEdges);
      otherEdges.addClass('faded');
    }
  }, [activeCluster]);

  useEffect(() => {
    if (!cyRef.current || !pathHighlight) return;
    const cy = cyRef.current;

    cy.nodes().removeClass('path-highlight faded');
    cy.edges().removeClass('path-highlight faded');

    const sourceNode = cy.getElementById(pathHighlight.source);
    const targetNode = cy.getElementById(pathHighlight.target);

    if (sourceNode.length && targetNode.length) {
      const dijkstra = cy.elements().dijkstra({
        root: sourceNode,
        weight: (edge: EdgeSingular) => 1 / edge.data('weight')
      });

      const path = dijkstra.pathTo(targetNode);

      if (path && path.length > 0) {
        const pathNodes = path.nodes();
        const pathEdges = path.edges();

        pathNodes.addClass('path-highlight');
        pathEdges.addClass('path-highlight');

        const allNodes = cy.nodes();
        const allEdges = cy.edges();
        const fadedNodes = allNodes.difference(pathNodes);
        const fadedEdges = allEdges.difference(pathEdges);

        fadedNodes.addClass('faded');
        fadedEdges.addClass('faded');
      }
    }
  }, [pathHighlight]);

  return (
    <>
      <div ref={containerRef} className="w-full h-96 rounded-lg border bg-background" />
      <NodeDetailSidebar node={selectedNode} onClose={() => setSelectedNode(null)} />
      <EdgeDetailPopup edge={selectedEdge} position={edgePopupPos} onClose={() => {
        setSelectedEdge(null);
        setEdgePopupPos(null);
      }} />
    </>
  );
}

import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as d3 from 'd3';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  @ViewChild('graphContainer') graphContainer!: ElementRef;
  graphData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipeService: RecipeService
  ) {
    this.graphData = data.formValues;
    this.graphData = this.transformGraphData(data.formValues);
  }

  ngAfterViewInit(): void {
    console.log(this.graphData);
    this.createGraph();
  }

  transformGraphData(rawData: any): any {
    const transformedNodes = rawData.nodes.map((node: any) => {
      return { id: node[0], data: node[1] };
    });

    const transformedEdges = rawData.edges.map((edge: any) => {
      console.log(edge);
      return {
        source: edge[0],
        target: edge[1],
        weight: edge[2].weight,
      };
    });
    console.log('transformedEdges');
    return { nodes: transformedNodes, edges: transformedEdges };
  }

  createGraph(): void {
    const container = this.graphContainer.nativeElement;
    const width = 800;
    const height = 600;

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const simulation = d3
      .forceSimulation(this.graphData.nodes)
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'link',
        d3
          .forceLink(this.graphData.edges)
          .id((d: any) => d.id)
          .distance(400)
      );

    const link = svg
      .selectAll('line')
      .data(this.graphData.edges)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => Math.sqrt(d.weight));

    const linkText = svg
      .selectAll('.link-text')
      .data(this.graphData.edges)
      .enter()
      .append('text')
      .attr('class', 'link-text')
      .text((d: any) => `(${d.weight.toFixed(2)})`)
      .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
      .attr('y', (d: any) => (d.source.y + d.target.y) / 2)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', 10);

    const node = svg
      .selectAll('circle')
      .data(this.graphData.nodes)
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('fill', '#5868bf');

    const nodeText = svg
      .selectAll('.node-text')
      .data(this.graphData.nodes)
      .enter()
      .append('text')
      .attr('class', 'node-text')
      .text((d: any) => {
        const recipeName = this.recipeService.getRecipeById(d.id)?.name;
        return recipeName
          ? recipeName.length > 20
            ? recipeName.substring(0, 20) + '...'
            : recipeName
          : '';
      })
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('font-size', 15)
      .attr('fill', 'black')
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5);

    // .attr('fill', 'white');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);

      linkText
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      nodeText.attr('x', (d: any) => d.x).attr('y', (d: any) => d.y);
    });
  }
}

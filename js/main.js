/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
function appendViz() {
  // Scales
  const groupSumPeopleScale = d3.scaleLinear()
    .domain([0, d3.max(groupsSumPeople)])
    .range([30, 200]);
  const numCharScale = d3.scaleLinear()
    .domain([0, d3.max(numChar)])
    .range([0, 140]);
  const titleNumPeopleScale = d3.scaleLinear()
    .domain([1, d3.max(numPeopleWithJobTitle)])
    .range([2, 20]);

  // Append SVG
  const titlesViz = d3.select('#titles-viz').append('svg')
    .attr('width', vizWidth)
    .attr('height', vizHeight);
  
  // Append arches
  const arches = titlesViz.append('g')
    .attr('class', 'arches')
    .attr('fill-opacity', 0.4)
    .attr('stroke', 'none');

  let yPos = 0;
  data.forEach(section => {
    const arches_sct = arches.append('g')
      .attr('class', section.sct_id);

    section.groups.forEach(group => {
      const arches_group = arches_sct.append('g')
        .attr('class', `group_${group.group_id}`);

      const archHeight = Math.ceil(groupSumPeopleScale(group.sumPeople));
      const arch_y2 = yPos + archHeight;
      const archMidHeight = (archHeight / 2) + yPos;
      const archCurve = archHeight / 4;
      
      // Append arches
      arches_group.selectAll('path')
        .data(group.titles)
        .join('path')
        .attr('class', d => `arch arch-${d.uid}`)
        .attr('d', d => {
          const archLength = Math.ceil(numCharScale(d.num_char));
          const archThickness = Math.ceil(titleNumPeopleScale(d.num_people));

          return `M${mainAxisX},${yPos} C${archLength / 1.5 + mainAxisX},${((arch_y2 - yPos) / 10) + yPos} ${archLength - archThickness/2 + mainAxisX},${archMidHeight - archCurve} ${archLength - archThickness/2 + mainAxisX},${archMidHeight} C${archLength - archThickness/2 + mainAxisX},${archMidHeight + archCurve} ${archLength / 1.5 + mainAxisX},${(9 * (arch_y2 - yPos) / 10) + yPos} ${mainAxisX},${arch_y2} ${archLength / 1.4 + mainAxisX},${(9 * (arch_y2 - yPos) / 10) + yPos} ${archLength + archThickness/2 + mainAxisX},${archMidHeight + archCurve} ${archLength + archThickness/2 + mainAxisX},${archMidHeight} C${archLength + archThickness/2 + mainAxisX},${archMidHeight - archCurve} ${archLength / 1.4 + mainAxisX},${((arch_y2 - yPos) / 10) + yPos} ${mainAxisX},${yPos} Z`;
        })
        .attr('fill', d => d.color)
        .attr('transform', d => {
          return d.isFreelance ? `rotate(180, ${mainAxisX}, ${archMidHeight})` : null;
        })
        .on('mouseover', (event, d) => {
          event.stopPropagation();
          // Show the tooltip
          handleMouseOver(event, d);
        })
        .on('mouseout', d => handleMouseOut(d));

        // Append group label
        const group_label = arches_group.append('text')
          .attr('x', mainAxisX)
          .attr('y', archMidHeight)
          .attr('fill-opacity', 1)
          .attr('font-size', '1.3rem')
          .text(group.group_label);

      yPos = arch_y2;
    });
    yPos += 50;
  });

  // Update SVG height based on content
  titlesViz.attr('height', yPos);
}

getScaleInfo();

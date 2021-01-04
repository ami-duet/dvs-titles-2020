/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
function appendViz() {
  // Scales
  const groupSumPeopleScale = d3.scaleLinear()
    .domain([d3.min(groupsSumPeople), d3.max(groupsSumPeople)])
    .range([30, 300]);
  const numCharScale = d3.scaleLinear()
    .domain([0, d3.max(numChar)])
    .range([0, 160]);
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
    .attr('fill-opacity', 0.62)
    .attr('stroke', 'none');

  let yPos = 0;
  data.forEach(section => {
    const arches_sct = arches.append('g')
      .attr('class', section.sct_id);

    // Append family description and info
    const sct_description_wrapper = arches_sct.append('foreignObject')
      .attr('class', 'family-description-wrapper')
      .attr('x', 0)
      .attr('y', yPos)
      .attr('width', vizWidth)
      .attr('height', 217);
    const sct_description = sct_description_wrapper.append('xhtml:div').append('div')
      .attr('class', `family-description family-description--${section.sct_id}`);
    sct_description.append('h3')
      .attr('class', 'sct-label')
      .html(`${section.sct_label}:`);
    sct_description.append('div')
      .attr('class', 'stats-people')
      .html(`${section.groups.length} groups, ${section.sctSumPeople} people`);
    sct_description.append('div')
      .attr('class', 'stats-leaders')
      .html(`${section.sctSumLeaders} in leadership position`);

    yPos += 217;

    section.groups.forEach(group => {
      const arches_group = arches_sct.append('g')
        .attr('class', `arches-group group_${group.group_id}`);

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

        const group_label_wrapper = arches_group.append('foreignObject')
          .attr('class', 'group-label-wrapper')
          .attr('x', 0)
          .attr('width', vizWidth/2);
        const group_label = group_label_wrapper.append('xhtml:div').append('div')
          .attr('class', 'group-label')
          .html(group.group_label);
        const labelHeight = group_label.node().getBoundingClientRect().height;
        group_label_wrapper
          .attr('y', archMidHeight - labelHeight/2)
          .attr('height', labelHeight);

      yPos = arch_y2;
    });
  });

  // Update SVG height based on content
  titlesViz.attr('height', yPos);
}

getScaleInfo();

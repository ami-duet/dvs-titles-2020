// Mouse over arch
function handleMouseOver(event, d) {
  // Find location of the mouse on the page
  const mouseX = event.pageX - 30;
  const mouseY = event.pageY + 20;

  // Update text in tooltip
  d3.select('.tooltip .job-title').text(d.job_title);
  d3.select('.tooltip .num-people').text(`(${d.num_people})`);

  // Reduce opacity of other paths
  d3.selectAll('.arch')
    .classed('down', true );
  d3.select(`.arch-${d.uid}`)
    .classed('highlighted', true);

  // Show tooltip
  d3.select('.tooltip')
    .style('top', mouseY + 'px')
    .style('left', mouseX + 'px')
    .classed('visible', true);
}

// Mouse leaves arch
function handleMouseOut() {
  // Hide tooltip
  d3.select('.tooltip')
    .style('top', '-100vh')
    .style('left', '-100vw')
    .classed('visible', false);

  // Bring opacity back
  d3.selectAll('.arch')
    .classed('down', false )
    .classed('highlighted', false);
}

// Hide tooltip when user clicks elsewhere on the screen
document.addEventListener('click', (e) => {
  const closestGroup = e.target.closest('g');
  if (closestGroup === null) {
    handleMouseOut();
  }
});

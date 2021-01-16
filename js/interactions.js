/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// Mouse over arch
function handleMouseOver(event, d) {
  // Find location of the mouse on the page
  const screenWidth = window.innerWidth;
  const phoneWidth = 375;
  const gapX = 30;
  const mouseX = event.pageX - gapX;
  const mouseY = event.pageY + 20;
  let maxWidth = phoneWidth;

  if (screenWidth >= 849) {
    const phoneX = mouseX - (screenWidth - phoneWidth) / 2;
    maxWidth = phoneWidth - phoneX - 6;
  }

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
    .style('max-width', maxWidth + 'px')
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
// Hide tooltip when user scrolls
document.onscroll = function() {
  if (document.getElementsByClassName('tooltip')[0].classList.contains('visible')) {
    handleMouseOut();
  }
};

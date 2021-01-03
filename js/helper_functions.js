/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// Mix colors
function mixColors(jobTitleFields) {
  let colors = [];
  jobTitleFields.forEach(jobTitleField => {
    colors.push(fields.find(field => field.field_id === jobTitleField).field_color);
  });

  const mix1 = mix(colors[0].substr(1), colors[1].substr(1), 50);
  return colors.length === 2 ? mix1 : mix(mix1.substr(1), colors[2].substr(1), 50);
}

/* Mix function from jedfoster ------------- */ 
/* https://gist.github.com/jedfoster/7939513 */
function mix(color_1, color_2, weight) {
  function d2h(d) { return d.toString(16); }  // convert a decimal value to hex
  function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal 

  weight = (typeof(weight) !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted

  var color = "#";

  for(var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
    var v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
        v2 = h2d(color_2.substr(i, 2)),
        
        // combine the current pairs from each source color, according to the specified weight
        val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0))); 

    while(val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit
    
    color += val; // concatenate val to our new color string
  }
    
  return color; // PROFIT!
}

// Populate arrays that will be used to create scales
function getScaleInfo() {
  data.forEach(section => {
    section.groups.forEach(group => {
      // Populate array with sum of people in each group
      groupsSumPeople.push(group.sumPeople);

      group.titles.forEach(title => {
        // Populate array with num of people with each job title
        numPeopleWithJobTitle.push(title.num_people);
        // Populate array with num of characters with each job title
        numChar.push(title.num_char);
      });
    });
  });

  appendViz();
}
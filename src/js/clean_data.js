// Load data
let data = [];
const sections = [
  { sct_id: 'data_science_sct', groups: ['data_specialist', 'bi', 'analyst', 'analytics', 'librarian', 'geo', 'dataviz'] },
];

sections.forEach(sct => {
  let currentSct = {};
  currentSct.sct_id = sct.sct_id;
  currentSct.groups = [];

  sct.groups.forEach(group => {
    let currentGroup = {};
    currentGroup.group_id = group;
    currentGroup.sumPeople = 0;
    currentGroup.titles = [];
    currentGroup.sumSeniors = 0;
    currentGroup.sumLeaders = 0;
    currentGroup.sumFreelancers = 0;

    currentSct.groups.push(currentGroup);
  });

  data.push(currentSct);
});

d3.csv('../data/data_job_titles.csv').then(data_original => {
  data_original.forEach(d => {
    const section = data.find(sct => sct.sct_id === d.section);
    const group = section.groups.find(group => group.group_id === d.group);
    let jobTitleInfo = {};

    jobTitleInfo.uid = d.uid;
    jobTitleInfo.num_char = parseInt(d.num_char);
    jobTitleInfo.job_title = d.job_title;
    jobTitleInfo.num_people = parseInt(d.num_people);
    group.sumPeople += jobTitleInfo.num_people;
    jobTitleInfo.isFreelance = d.pos_freelance !== '' ? true : false;
  
    jobTitleInfo.fields = [];
    fields.forEach(field => {
      if (d[field.field_id] === '1') { jobTitleInfo.fields.push(field.field_id); }
    });
    group.titles.push(jobTitleInfo);
    
    jobTitleInfo.color = jobTitleInfo.fields.length === 1
      ? fields.find(field => field.field_id === jobTitleInfo.fields[0]).field_color
      : mixColors(jobTitleInfo.fields);
  
    if (d.pos_senior !== '') { group.sumSeniors += parseInt(d.pos_senior); }
    if (d.pos_lead !== '') { group.sumLeaders += parseInt(d.pos_lead); }
    if (d.pos_freelance !== '') { group.sumFreelancers += parseInt(d.pos_freelance); }

  });
  
  console.log(data);
  getScaleInfo();
});

/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// Load data
let data = [];
const sections = [
  { 
    sct_id: 'it_sct', 
    groups: [
      {group_id: 'dev', group_label: 'Developers'},
      {group_id: 'it', group_label: 'IT Specialists'},
      {group_id: 'eng', group_label: 'Engineers'},
      {group_id: 'scientist', group_label: 'Scientists'},
    ]
  },
  { 
    sct_id: 'data_science_sct', 
    groups: [
      {group_id: 'data_specialist', group_label: 'Data Scientists'},
      {group_id: 'bi', group_label: 'Business Intelligence'},
      {group_id: 'analyst', group_label: 'Analysts'},
      {group_id: 'analytics', group_label: 'Analytics Specialists'},
      {group_id: 'librarian', group_label: 'Librarians'},
      {group_id: 'geo', group_label: 'Geographic & Geospatial'},
      {group_id: 'dataviz', group_label: 'Data Visualization Specialists'},
    ]
  },
  { 
    sct_id: 'design_comm_sct', 
    groups: [
      {group_id: 'journalist', group_label: 'Journalist'},
      {group_id: 'designer', group_label: 'Designers'},
      {group_id: 'artist', group_label: 'Artists'},
      {group_id: 'writer', group_label: 'Writers & Editors'},
      {group_id: 'social_public', group_label: 'Social Sciences & Public service'},
      {group_id: 'comm_marketing', group_label: 'Communications & Marketing'},
    ] 
  },
  { 
    sct_id: 'business_sct', 
    groups: [
      {group_id: 'business_dev_op', group_label: 'Business Development & Operations'},
      {group_id: 'finance_economy', group_label: 'Finances & Economy'},
      {group_id: 'merl', group_label: 'Monitoring, Evaluation & Performance'},
    ] 
  },
  { 
    sct_id: 'learning_sct', 
    groups: [
      {group_id: 'teacher', group_label: 'Teachers & Professors'},
      {group_id: 'student', group_label: 'Students'},
      {group_id: 'postdoc', group_label: 'PostDoctoral'},
      {group_id: 'research', group_label: 'Researchers'},
      {group_id: 'support', group_label: 'Support staff'},
    ] 
  },
  { 
    sct_id: 'unknown_sct', 
    groups: [
      {group_id: 'freelance_consultant', group_label: 'Consultants & Freelancers'},
      {group_id: 'manager', group_label: 'Managers'},
      {group_id: 'head', group_label: 'Executives & Founders'},
      {group_id: 'dir', group_label: 'Directors & Supervisors'},
    ]
  },
  { 
    sct_id: 'another_sct', 
    groups: [
      {group_id: 'unemployed', group_label: 'Unemployed'},
      {group_id: 'another', group_label: 'Another'},
    ] 
  }
];

sections.forEach(sct => {
  let currentSct = {};
  currentSct.sct_id = sct.sct_id;
  currentSct.groups = [];

  sct.groups.forEach(group => {
    let currentGroup = {};
    currentGroup.group_id = group.group_id;
    currentGroup.group_label = group.group_label;
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

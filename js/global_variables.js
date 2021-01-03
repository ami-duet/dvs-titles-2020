/*! project-name v0.0.1 | (c) 2021 YOUR NAME | MIT License | http://link-to-your-git-repo.com */
// Global variables

// Layout
const vizWidth = 340;
let vizHeight = 3000;
const mainAxisX = 170;

// Data-related variables
const fields = [
  { field_id: 'field_ds', field_color: '#598235' },
  { field_id: 'field_it', field_color: '#355F30' },
  { field_id: 'field_science', field_color: '#95AD5C' },
  { field_id: 'field_art', field_color: '#DB8A80' },
  { field_id: 'field_design', field_color: '#C55344' },
  { field_id: 'field_communications', field_color: '#903227' },
  { field_id: 'field_finance', field_color: '#407FA0' },
  { field_id: 'field_business', field_color: '#295266' },
  { field_id: 'field_economy', field_color: '#6DA8C5' },
  { field_id: 'field_student', field_color: '#FAA80F' },
  { field_id: 'field_teacher', field_color: '#C88304' },
  { field_id: 'field_research', field_color: '#FCC55F' },
  { field_id: 'field_unknown_free', field_color: '#F6F5F3' },
  { field_id: 'field_unknown_manager', field_color: '#998675' },
  { field_id: 'field_unknown_head', field_color: '#BAADA1' },
  { field_id: 'field_unknown_dir', field_color: '#CBC1B9' },
  { field_id: 'field_unknown_unemployed', field_color: '#DCD6D0' },
  { field_id: 'field_unknown_another', field_color: '#F6F5F3' }
];

const groupsSumPeople = [];
const numChar = [];
const numPeopleWithJobTitle = [];

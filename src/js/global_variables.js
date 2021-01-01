// Global variables

// Layout
const vizWidth = 300;
const vizHeight = 2000;
const mainAxisX = 150;

// Data-related variables
const fields = [
  { field_id: 'field_ds', field_color: '#598235' },
  { field_id: 'field_it', field_color: '#355F30' },
  { field_id: 'field_science', field_color: '#95AD5C' },
  { field_id: 'field_art', field_color: '#DB8A80' },
  { field_id: 'field_design', field_color: '#CC5A4B' },
  { field_id: 'field_communications', field_color: '#903227' },
  { field_id: 'field_finance', field_color: '#407FA0' },
  { field_id: 'field_business', field_color: '#295266' },
  { field_id: 'field_economy', field_color: '#6DA8C5' },
  { field_id: 'field_student', field_color: '#C88304' },
  { field_id: 'field_teacher', field_color: '#FAA80F' },
  { field_id: 'field_research', field_color: '#FCC55F' },
  { field_id: 'field_unknown', field_color: '#F6F5F3' }
];

const groupsSumPeople = [];
const numChar = [];
const numPeopleWithJobTitle = [];

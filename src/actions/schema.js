import { schema } from 'normalizr';

export const questionSchema = new schema.Entity('questions');
export const sectionSchema = new schema.Entity('sections', {
  questions: [questionSchema],
});
export const documentSchema = new schema.Object({
  sections: [sectionSchema],
});

export const research = [
  {
    slug: 'calibrated-uncertainty',
    title: 'Calibrated uncertainty for small geospatial datasets',
    year: '2024—ongoing',
    status: 'In progress',
    type: 'Independent study',
    summary: 'When a model knows it has seen too little, how should it say so?',
    question:
      'Can calibration and transparent confidence bands make small-data geospatial models safer to use without hiding useful signal?',
    notes: [
      'Comparing isotonic and Platt scaling across deliberately small training splits.',
      'Evaluating reliability diagrams alongside the metric a decision-maker actually sees.',
      'Writing down failure conditions before optimizing the headline score.',
    ],
    pdf: '',
    repo: '',
  },
  {
    slug: 'interfaces-for-evidence',
    title: 'Interfaces for evidence, not certainty',
    year: '2023—2024',
    status: 'Working paper',
    type: 'Design research',
    summary: 'A research notebook on how interfaces frame model output as evidence.',
    question:
      'What small interface choices help a reader separate a measured observation from a model-generated suggestion?',
    notes: [
      'Collected patterns from scientific tools, civic dashboards, and data notebooks.',
      'Prototyped language and visual treatments for confidence and provenance.',
      'Documented the tension between speed of reading and quality of interpretation.',
    ],
    pdf: '',
    repo: '',
  },
  {
    slug: 'efficient-labeling',
    title: 'Efficient labeling under a limited budget',
    year: '2023',
    status: 'Archived notes',
    type: 'Course project',
    summary: 'A practical comparison of active-learning strategies for a small image set.',
    question:
      'Which query strategy gives a small team the most useful improvement per labeling hour?',
    notes: [
      'Benchmarked uncertainty sampling against a random baseline.',
      'Kept a record of annotator disagreement rather than discarding it.',
      'Built a small review loop to surface ambiguous examples first.',
    ],
    pdf: '',
    repo: '',
  },
];
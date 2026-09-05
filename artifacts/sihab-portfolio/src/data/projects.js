export const projects = [
  {
    slug: 'gallstone-classification',
    index: '01',
    title: 'Gallstone Classification',
    category: 'Machine Learning',
    year: 'Ongoing',
    description: 'A supervised ML study for classifying gallstone cases with careful preprocessing and hyperparameter tuning.',
    tags: ['Python', 'Scikit-learn', 'Pandas'],
    featured: true,
    overview:
      'Gallstone Classification is an ongoing academic project focused on turning clinical-style tabular data into a more reliable classification workflow.',
    challenge:
      'The project needs to balance a meaningful accuracy result with a transparent account of preprocessing, feature choices, and the limits of the dataset.',
    approach: [
      'Collected and prepared the dataset for a reproducible training workflow.',
      'Compared candidate models and tuned their hyperparameters.',
      'Tracked evaluation decisions so the result can be explained, not just reported.',
    ],
    outcome:
      'The current model reaches 84% accuracy while the project continues toward a fuller evaluation and clearer error analysis.',
    repo: '',
    live: '',
    paper: '',
  },
  {
    slug: 'stress-level-prediction',
    index: '02',
    title: 'Stress Level Prediction',
    category: 'Data Science',
    year: '2024',
    description: 'A student-data prediction study built around collection, preprocessing, and careful interpretation.',
    tags: ['Python', 'Pandas', 'Data Analysis'],
    overview:
      'Stress Level Prediction explores how student-reported data can be collected and prepared for a model that estimates stress levels.',
    challenge:
      'Small, human-reported datasets can make patterns look more certain than they are. The workflow keeps the data preparation and assumptions visible.',
    approach: [
      'Collected and organized student-level observations.',
      'Preprocessed the dataset with pandas before modeling.',
      'Framed predictions as a starting point for further investigation, not a diagnosis.',
    ],
    outcome: 'A compact data-science project that connects preprocessing choices to the human context behind the rows.',
    repo: '',
    live: '',
    paper: '',
  },
  {
    slug: 'restaurant-review-booking',
    index: '03',
    title: 'Restaurant Review & Booking',
    category: 'Web Development',
    year: '2024',
    description: 'An Oracle APEX system combining database design, interface flows, reviews, and recommendation queries.',
    tags: ['Oracle APEX', 'SQL', 'UI'],
    overview:
      'Restaurant Review & Booking is a database-backed academic project designed to connect browsing, booking, and review workflows.',
    challenge:
      'The system had to make the database structure useful to a real interface while keeping the query and recommendation logic understandable.',
    approach: [
      'Designed the relational structure around restaurants, users, bookings, and reviews.',
      'Built the interface and booking flows in Oracle APEX.',
      'Added recommendation-oriented queries to make the data useful beyond CRUD.',
    ],
    outcome: 'A full-stack database project that makes the relationship between schema, UI, and user decisions visible.',
    repo: '',
    live: '',
    paper: '',
  },
  {
    slug: 'efficient-task-scheduler',
    index: '04',
    title: 'Efficient Task Scheduler',
    category: 'Other',
    year: '2023',
    description: 'A C++ scheduling study implementing FCFS, SJF, Round Robin, and Priority Scheduling algorithms.',
    tags: ['C++', 'Algorithms', 'Operating Systems'],
    overview:
      'Efficient Task Scheduler compares classic CPU scheduling strategies through a focused implementation and readable algorithmic output.',
    challenge:
      'The goal was to make the trade-offs between scheduling policies concrete instead of treating them as isolated textbook definitions.',
    approach: [
      'Implemented FCFS, SJF, Round Robin, and Priority Scheduling in C++.',
      'Compared the algorithms across shared task inputs.',
      'Kept the implementation small enough to inspect and explain line by line.',
    ],
    outcome: 'A practical algorithms project that connects implementation detail to performance trade-offs.',
    repo: '',
    live: '',
    paper: '',
  },
];
export default {
  id: 1,
  title: 'Hello World',
  sections: [
    {
      id: 11231233,
      title: {
        text: 'Section 1',
        isHidden: false,
      },
      ingress: {
        text: 'This is my first section',
        isHidden: false,
      },
      questions: [
        {
          id: 12312333,
          type: 'bulletPointList',
          title: 'My bullet point list ',
          bulletPoints: [
            {
              id: 1,
              text: 'Hei',
            },
            {
              id: 2,
              text: 'Eivind',
            },
          ],
        },
        {
          id: 12312323,
          type: 'checkbox',
          title: 'Do you want me?',
          checked: false,
        },
        {
          id: 12323123,
          type: 'textField',
          title: 'Last name',
          value: 'Reime',
        },
      ],
    },
    {
      id: 24324234,
      title: {
        text: 'Section 2',
        isHidden: false,
      },
      ingress: {
        text: 'This is my second section',
        isHidden: true,
      },
      questions: [
        {
          id: 12343244,
          type: 'bulletPointList',
          title: 'My bullet point list ',
          bulletPoints: [
            {
              id: 1,
              text: 'Hei',
            },
            {
              id: 2,
              text: 'Eivind',
            },
          ],
        },
        {
          id: 25345344,
          type: 'textField',
          title: 'Last name',
          value: 'Reime',
        },
        {
          id: 34353453,
          type: 'checkbox',
          title: 'Do you want me?',
          checked: false,
        },
      ],
    },
  ],
};

/*
Normalized mock data would probably look like this:

{
  document: {
    id: 1,
    title: 'Hello World',
    sections: [11231233, 24324234],
  }
  questions: [
    {
      id: 12312333,
      type: 'bulletPointList',
      title: 'My bullet point list ',
      fieldInFocus: 0,
      bulletPoints: [
        {
          id: 1,
          text: 'Hei',
        },
        {
          id: 2,
          text: 'Eivind',
        },
      ],
    },
    {
      id: 12312323,
      type: 'checkbox',
      title: 'Do you want me?',
      checked: false,
    },
    {
      id: 12323123,
      type: 'textField',
      title: 'Last name',
      value: 'Reime',
    },
    {
      id: 12343244,
      type: 'bulletPointList',
      title: 'My bullet point list ',
      fieldInFocus: 0,
      bulletPoints: [
        {
          id: 1,
          text: 'Hei',
        },
        {
          id: 2,
          text: 'Eivind',
        },
      ],
    },
    {
      id: 25345344,
      type: 'textField',
      title: 'Last name',
      value: 'Reime',
    },
    {
      id: 34353453,
      type: 'checkbox',
      title: 'Do you want me?',
      checked: false,
    },
  ],
  sections: [
    {
      id: 11231233,
      title: {
        text: 'Section 1',
        isHidden: false,
      },
      ingress: {
        text: 'This is my first section',
        isHidden: false,
      },
      questions: [12312333, 12312323, 12323123],
    },
    {
      id: 24324234,
      title: {
        text: 'Section 2',
        isHidden: false,
      },
      ingress: {
        text: 'This is my second section',
        isHidden: true,
      },
      questions: [12343244, 25345344, 34353453],
    },
  ],
}

*/

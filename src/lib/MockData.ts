
export function mockProfileData() {
  const pd = {
    id: '456',
    fullname: 'Mock existing name',
    profile: {
      address: 'out there',
      gender: undefined,
    },
    contacts: [
      {email: 'ked@example.com', name: 'K Ed', contacttype: 'regular',},
      {email: 'noone@example.com', name: 'No One', contacttype: 'regular',},
    ]
  };

  return pd;
}


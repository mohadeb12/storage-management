const getTerms = (req, res) => {
  res.json({
    success: true,
    data: {
      title: 'Terms & Conditions',
      content: 'Sample terms and conditions content for the storage management system.'
    }
  });
};

const getPrivacy = (req, res) => {
  res.json({
    success: true,
    data: {
      title: 'Privacy Policy',
      content: 'Sample privacy policy content for the storage management system.'
    }
  });
};

const getAbout = (req, res) => {
  res.json({
    success: true,
    data: {
      title: 'About Us',
      content: 'This is a sample about us text for the storage management system.'
    }
  });
};

const getSupport = (req, res) => {
  res.json({
    success: true,
    data: {
      title: 'Support',
      content: 'If you face any problem, please contact support@example.com.'
    }
  });
};

module.exports = {
  getTerms,
  getPrivacy,
  getAbout,
  getSupport
};
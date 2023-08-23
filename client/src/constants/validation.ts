const RegularValidationForPassword =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const RegularValidationForEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const RegularValidationForFirstName =
  /^[A-Za-zА-Яа-яЁё]+(?:[-\s][A-Za-zА-Яа-яЁё]+)?$/;

const RegularValidationForLastName =
  /^[A-Za-zА-Яа-яЁё]+(?:[-\s][A-Za-zА-Яа-яЁё]+)?$/;

const RegularValidationForChannelAndGroupName = /^[a-zA-Z0-9\s_-]?$/;

const RegularValidationForChannelAndGroupDescription = /^.$/;

const PasswordValidation = {
  required: {
    value: true,
    message: 'Password is required',
  },
  minLength: {
    value: 6,
    message: 'Min length is 6 charters',
  },
  maxLength: {
    value: 20,
    message: 'Max length is 20 charters',
  },
  pattern: {
    value: RegularValidationForPassword,
    message: 'Password is not valid',
  },
};
const EmailValidation = {
  required: {
    value: true,
    message: 'Email is required',
  },
  pattern: {
    value: RegularValidationForEmail,
    message: 'Email is not valid',
  },
};
const FirstNameValidation = {
  required: { value: true, message: 'First Name is required' },
  pattern: {
    value: RegularValidationForFirstName,
    message: 'First Name is not valid',
  },
};
const LastNameValidation = {
  required: { value: true, message: 'Last Name is required' },
  pattern: {
    value: RegularValidationForLastName,
    message: 'Last Name is not valid',
  },
};
const PhoneValidation = {
  required: {
    value: true,
    message: 'Phone is required',
  },
};

const ChannelAndGroupNameValidation = {
  required: {
    value: true,
    message: 'Name is required',
  },
  minLength: {
    value: 1,
    message: `Min length is 1 charters`,
  },
  maxLength: {
    value: 50,
    message: `Max length is 50 charters`,
  },
  // pattern: {
  //     value: RegularValidationForChannelAndGroupName,
  //     message: 'Name is not valid',
  // },
};

const ChannelAndGroupDescriptionValidation = {
  required: {
    value: true,
    message: 'Description is required',
  },
  minLength: {
    value: 10,
    message: `Min length is 10 charters`,
  },
  maxLength: {
    value: 200,
    message: `Max length is 200 charters`,
  },
  // pattern: {
  //     value: RegularValidationForChannelAndGroupDescription,
  //     message: 'Description is not valid',
  // },
};

export {
  ChannelAndGroupNameValidation,
  EmailValidation,
  FirstNameValidation,
  LastNameValidation,
  PhoneValidation,
  PasswordValidation,
  ChannelAndGroupDescriptionValidation,
};

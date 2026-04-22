export interface User {
  id: string;
  username: string;
  email: string;
  countryCode: string;
}

export interface RegisterUser {
  userNickname: string;
  email: string;
  password: string;
  countryCode: string;
}

export interface RegisterPublisher extends RegisterUser {
  publisherName: string;
  foundationDate: string;
  website: string;
}
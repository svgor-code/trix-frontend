export interface IUserSettings {
  username: string;
  avatar: string;
}

export interface IUser {
  id: number;
  walletAddress: string;
  avatar: string;
  username: string;
}

export interface IAlertSettings {
  id: number;
  image: string;
  colorUser: string;
  colorAmount: string;
  colorText: string;
  duration: number;
  showImage: boolean;
  showUsername: boolean;
  showAmount: boolean;
  showMessage: boolean;
}

export interface IDonationPageSettings {
  id: number;
  headerBanner: string;
  backgroundBanner: string;
  welcomeText: string;
  buttonText: string;
  color_main: string;
  color_background: string;
}

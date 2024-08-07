export interface IUserSettings {
  username: string;
  avatar: string;
}

export interface IUser {
  _id: string;
  walletAddress: string;
  avatar: string;
  username: string;
  alert: IAlertSettings;
  donationPage: IDonationPageSettings;
}

export interface IAlertSettings {
  image: string;
  color_user: string;
  color_amount: string;
  color_text: string;
  duration: number;
  showImage: boolean;
  showUsername: boolean;
  showAmount: boolean;
  showMessage: boolean;
}

export interface IDonationPageSettings {
  headerBanner: string;
  backgroundBanner: string;
  welcomeText: string;
  buttonText: string;
  color_main: string;
  color_background: string;
}

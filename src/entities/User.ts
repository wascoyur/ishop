export type Profile = {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: number; lng: number };
  };
  phone?: string;
  website?: string;
  company?: { name: string; catchPhrase: string; bs: string };
  about?: string;
  signUpDate: Date;
};
export type typeUserProfileCardProps = {
  user: Profile;
  onEditProfile: () => void;
};

export interface CapsuleFormData {
  email: string;
  name: string;
  dateOfOpening: string;
  message: string;
  type: 'public' | 'private';
  media: File[];
  links: string[];
  allowedUsers: string[];
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | '';
}
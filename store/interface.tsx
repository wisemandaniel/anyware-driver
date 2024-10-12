export interface IUploadedFile {
  id: string;
  url: string;
  name: string;
  createdBy: string;
}

export interface ISystemState {
  loading: boolean;
  initUserLoading: boolean;
  imagePickerResult: any;
  currentModalResult: any;
  systemData: any;
  error: string | null;
  success: string | null;
  systemIsReady: boolean;
  progress: number;
}

export interface ILanguageState {
  systemLanguage: string;
}

export interface ISystemPersistState {
  token: string | null;
  isUserInitialized: boolean;
  user?: {};
  item: {};
  uploadedImages: Record<string, IUploadedFile>;
  card: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    type: string;
    size?: string;
  }>;
  currentRestaurant: {};
  allRestaurant: [];
  order: {};
  currentMeal: {};
}

export interface IUploadedFile {
  id: string;
  url: string;
  name: string;
  createdBy: string;
}

export interface IAppState {
  system: ISystemState;
  language: ILanguageState;
  systemPersist: ISystemPersistState;
}

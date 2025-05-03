// ReviewFormのプロパティ定義
export interface ReviewFormProps {
  beerId: string;
  beerName: string;
  onReviewSubmitted?: () => void;
  isEditMode?: boolean;
  existingReview?: {
    id: string;
    rating: number;
    comment: string;
    imageUrl?: string;
  };
  onCancelEdit?: () => void;
}

// 星評価入力コンポーネントのプロパティ
export interface RatingInputProps {
  rating: number;
  onChange: (value: number) => void;
}

// 画像アップローダーコンポーネントのプロパティ
export interface ImageUploaderProps {
  initialImageUrl?: string | null;
  onImageChange: (file: File | null) => void;
  onImagePreviewChange: (previewUrl: string | null) => void;
  isUploading?: boolean;
}

// 送信ボタングループのプロパティ
export interface SubmitButtonGroupProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  onCancel?: () => void;
}

// エラーメッセージ表示のプロパティ
export interface ErrorMessageProps {
  message: string | null;
}

// 成功メッセージ表示のプロパティ
export interface SuccessMessageProps {
  isEditMode: boolean;
}

// 共通のReview型定義
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userPhotoURL?: string | null;
  rating: number;
  comment: string;
  imageUrl?: string | null;
  createdAt: any; // Firestoreのタイムスタンプ
}

// ReviewForm用の簡易レビュー情報
export interface ExistingReview {
  id: string;
  rating: number;
  comment: string;
  imageUrl?: string | null;
}

// ReviewsSection コンポーネントのプロパティ
export interface ReviewsSectionProps {
  beerId: string;
  beerName: string;
  maxReviews?: number; // 表示するレビュー数の上限
  onReviewsLoaded?: (reviewCount: number, avgRating: number) => void; // 親コンポーネントに情報を渡すためのコールバック
}

// ReviewItem コンポーネントのプロパティ
export interface ReviewItemProps {
  review: Review;
  isEditing: boolean;
  isOwner: boolean;
  beerId: string;
  beerName: string;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
  onImageClick: (imageUrl: string) => void;
  onReviewSubmitted: () => void;
  onCancelEdit: () => void;
  formatDate: (timestamp: any) => string;
}

// ReviewStars コンポーネントのプロパティ
export interface ReviewStarsProps {
  rating: number;
  reviewId: string;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// ImageModal コンポーネントのプロパティ
export interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

// DeleteConfirmationModal コンポーネントのプロパティ
export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

// ReviewActions コンポーネントのプロパティ
export interface ReviewActionsProps {
  showForm: boolean;
  isEditing: boolean;
  beerId: string;
  beerName: string;
  isLoggedIn: boolean;
  onReviewButtonClick: () => void;
  onFormCancel: () => void;
  onReviewSubmitted: () => void;
}

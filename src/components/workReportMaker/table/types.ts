export type Report = { section: string; category: string; content: string };

export const SECTION_TYPES = {
  TODAY: '금일 진행 사항',
  TOMORROW: '익일 예정 사항',
} as const;

export interface Props {
  allContentItems: Report[];
  editingMap: Record<string, Report>;
  setEditingMap: React.Dispatch<React.SetStateAction<Record<string, Report>>>;
  editingKey: string | null;
  setEditingKey: (key: string | null) => void;
  handleEditChange: (
    originalContent: string,
    field: 'section' | 'category' | 'content',
    value: string
  ) => void;
  handleSaveEdit: (originalContent: string, overrideSection?: string) => void;
  handleDelete: (section: string, category: string, content: string) => void;
  handleOrderChange: (newOrder: Report[]) => void;
  section: string;
  handleAdd: (section: string, category: string, content: string) => void;
}

export interface EditableCellProps {
  item: Report;
  field: 'category' | 'content';
  editingMap: Record<string, Report>;
  handleEditChange: Props['handleEditChange'];
  handleEnterSave: (e: React.KeyboardEvent<HTMLDivElement>, content: string) => void;
}

export interface ActionButtonsProps {
  item: Report;
  editingKey: string | null;
  handleSaveEdit: Props['handleSaveEdit'];
  setEditingKey: Props['setEditingKey'];
  handleMoveSection: (e: React.MouseEvent, content: string, targetSection: string) => void;
}

export interface DeleteButtonProps {
  item: Report;
  editingKey: string | null;
  handleDelete: (e: React.MouseEvent, item: Report) => void;
}

export interface SortableRowProps {
  item: Report;
  index: number;
  isEditing: boolean;
  isHover: boolean;
  rowRef: React.RefObject<HTMLTableRowElement | null>;
  setHoverIndex: (index: number | null) => void;
  handleEdit: (item: Report) => void;
  handleDelete: (e: React.MouseEvent, item: Report) => void;
  handleMoveSection: (e: React.MouseEvent, content: string, targetSection: string) => void;
  editingMap: Record<string, Report>;
  handleEditChange: Props['handleEditChange'];
  handleSaveEdit: Props['handleSaveEdit'];
  handleEnterSave: (e: React.KeyboardEvent<HTMLDivElement>, content: string) => void;
  editingKey: string | null;
  setEditingKey: Props['setEditingKey'];
}

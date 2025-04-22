import { useState } from 'react';

export const useWorkReport = () => {
  const [reportData, setReportData] = useState<Record<string, Record<string, string[]>>>({});
  const [editingMap, setEditingMap] = useState<
    Record<string, { section: string; category: string; content: string }>
  >({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAdd = (section: string, category: string, content: string) => {
    if (!section || !category) return;
    setReportData((prev) => {
      const newData = { ...prev };
      if (!newData[section]) newData[section] = {};
      if (!newData[section][category]) newData[section][category] = [];
      newData[section][category].push(content);
      return newData;
    });
  };

  const handleCopy = async () => {
    const text = generateText();
    await navigator.clipboard.writeText(text);
    setOpenSnackbar(true); // 토스트 알림 열기
  };

  const generateText = () => {
    return Object.entries(reportData)
      .sort(([a], [b]) => {
        // 가나다 순으로 정렬 (금일, 익일 순서)
        return a.localeCompare(b);
      })
      .map(([section, categories]) => {
        // 타이틀
        const sectionTitle = `*[${section}]*`;

        const categoryText = Object.entries(categories)
          .map(([cat, items]) => {
            const validItems = items.filter((item) => item.trim() !== '');
            // 항목만 있으면 항목만
            if (validItems.length === 0) return `● ${cat}`;

            // 내용
            const itemList = validItems.map((item) => `    ○ ${item}`).join('\n');

            // 내용을 항목이 존재하면 아래에 붙이고 없으면 항목과 같이
            return cat.trim() ? `● ${cat}\n${itemList}` : itemList;
          })
          .join('\n');

        if (!categoryText) return ''; // 이 섹션 안에 아무 카테고리도 없으면 출력 안함

        // 합쳐서 출력
        return `${sectionTitle}\n${categoryText}`;
      })
      .join('\n\n')
      .trim();
  };

  const text = generateText();

  const allContentItems = Object.entries(reportData).flatMap(([section, categories]) =>
    Object.entries(categories).flatMap(([category, items]) =>
      items.map((item) => ({
        section,
        category,
        content: item,
      }))
    )
  );

  const handleDelete = (section: string, category: string, content: string) => {
    setReportData((prev) => {
      const newData = { ...prev };
      newData[section][category] = newData[section][category].filter((item) => item !== content);

      if (newData[section][category].length === 0) {
        delete newData[section][category];
      }
      if (Object.keys(newData[section]).length === 0) {
        delete newData[section];
      }
      return newData;
    });
  };

  const handleEditChange = (
    originalContent: string,
    field: 'section' | 'category' | 'content',
    value: string
  ) => {
    setEditingMap((prev) => ({
      ...prev,
      [originalContent]: {
        ...prev[originalContent],
        [field]: value,
      },
    }));
  };

  const handleSaveEdit = (
    originalSection: string,
    originalCategory: string,
    originalContent: string
  ) => {
    const newValues = editingMap[originalContent];
    if (!newValues) return;

    const { section: newSection, category: newCategory, content: newContent } = newValues;

    setReportData((prev) => {
      const newData = { ...prev };

      // 원래 위치에서 삭제
      newData[originalSection][originalCategory] = newData[originalSection][
        originalCategory
      ].filter((item) => item !== originalContent);
      if (newData[originalSection][originalCategory].length === 0) {
        delete newData[originalSection][originalCategory];
      }
      if (Object.keys(newData[originalSection]).length === 0) {
        delete newData[originalSection];
      }

      // 새 위치에 추가
      if (!newData[newSection]) newData[newSection] = {};
      if (!newData[newSection][newCategory]) newData[newSection][newCategory] = [];
      newData[newSection][newCategory].push(newContent);

      return newData;
    });

    setEditingMap((prev) => {
      const newMap = { ...prev };
      delete newMap[originalContent];
      return newMap;
    });

    setEditingKey(null);
  };

  return {
    handleAdd,
    allContentItems,
    editingMap,
    editingKey,
    handleEditChange,
    handleSaveEdit,
    setEditingMap,
    setEditingKey,
    handleDelete,
    handleCopy,
    openSnackbar,
    text,
    setOpenSnackbar,
  };
};

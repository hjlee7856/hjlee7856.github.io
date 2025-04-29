import { editWorkReport, getWorkReport } from '@/firestore/workReport';
import useUserStore from '@/store/userStore';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'workReportData';

type Report = {
  section: string;
  category: string;
  content: string;
};

export const useWorkReport = () => {
  const [reportData, setReportData] = useState<Record<string, Record<string, string[]>>>({});
  const [editingMap, setEditingMap] = useState<
    Record<string, { section: string; category: string; content: string }>
  >({});
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const { user: currentUser } = useUserStore();

  const resetData = () => {
    setReportData({});
  };

  // ✅ Firestore 또는 LocalStorage에서 불러오기
  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        const data = await getWorkReport(currentUser);
        if (data) {
          setReportData(data);
        }
      } else {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setReportData(JSON.parse(saved));
        }
      }
    };

    loadData();
  }, [currentUser]);

  useEffect(() => {
    const saveData = async () => {
      if (currentUser) {
        await editWorkReport(JSON.stringify(reportData), currentUser);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reportData));
      }
    };

    saveData();
  }, [reportData, currentUser, resetData]);

  const handleAdd = (section: string, category: string, content: string) => {
    if (!section || !category) return;
    setReportData((prev) => {
      const newData = { ...prev };
      newData[section] = newData[section] || {};
      newData[section][category] = [...(newData[section][category] || []), content];
      return newData;
    });
  };

  const handleDelete = (section: string, category: string, content: string) => {
    setReportData((prev) => {
      const newData = { ...prev };
      newData[section][category] = newData[section][category].filter((item) => item !== content);
      if (newData[section][category].length === 0) delete newData[section][category];
      if (Object.keys(newData[section]).length === 0) delete newData[section];
      return newData;
    });
  };

  const handleOrderChange = (newOrder: Report[]) => {
    setReportData((prev) => {
      const newData: Record<string, Record<string, string[]>> = {};

      // 새로운 순서로 데이터 재구성
      newOrder.forEach((item) => {
        if (!newData[item.section]) {
          newData[item.section] = {};
        }
        if (!newData[item.section][item.category]) {
          newData[item.section][item.category] = [];
        }
        newData[item.section][item.category].push(item.content);
      });

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

  const handleSaveEdit = (originalContent: string, overrideSection?: string) => {
    const newValues = editingMap[originalContent];
    if (!newValues) return;

    const original = allContentItems.find((item) => item.content === originalContent);
    if (!original) return;

    const newSection = overrideSection || newValues.section;
    const newCategory = newValues.category;
    const newContent = newValues.content;

    setReportData((prev) => {
      const newData = { ...prev };

      // 기존 삭제
      newData[original.section][original.category] = newData[original.section][
        original.category
      ].filter((item) => item !== originalContent);
      if (newData[original.section][original.category].length === 0)
        delete newData[original.section][original.category];
      if (Object.keys(newData[original.section]).length === 0) delete newData[original.section];

      // 새로 추가
      newData[newSection] = newData[newSection] || {};
      newData[newSection][newCategory] = [...(newData[newSection][newCategory] || []), newContent];

      return newData;
    });

    setEditingMap((prev) => {
      const newMap = { ...prev };
      delete newMap[originalContent];
      return newMap;
    });
  };

  const generateText = () => {
    return Object.entries(reportData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([section, categories]) => {
        const sectionTitle = `[${section}]`;
        const categoryText = Object.entries(categories)
          .map(([cat, items]) => {
            const validItems = items.filter((item) => item.trim() !== '');
            if (validItems.length === 0) return `● ${cat}`;
            const itemList = validItems.map((item) => `    ○ ${item}`).join('\n');
            return cat.trim() ? `● ${cat}\n${itemList}` : itemList;
          })
          .join('\n');
        return categoryText ? `${sectionTitle}\n${categoryText}` : '';
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
    text,
    resetData,
    handleOrderChange,
  };
};

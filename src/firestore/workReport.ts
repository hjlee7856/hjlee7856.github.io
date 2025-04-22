import { db } from '@/firestore/firesbase';
import { User } from '@/store/userStore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const editWorkReport = async (data: string, currentUser: User) => {
  try {
    const reportRef = doc(db, 'workReports', currentUser.uid);
    const docSnap = await getDoc(reportRef);
    if (!docSnap.exists()) {
      // 문서 없으면 생성
      await setDoc(reportRef, {
        workReportData: data,
        createdAt: new Date(),
      });
    } else {
      // 문서 있으면 수정
      await updateDoc(reportRef, {
        workReportData: data,
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Failed to edit work report:', error);
  }
};

export const getWorkReport = async (currentUser: User) => {
  try {
    const reportRef = doc(db, 'workReports', currentUser.uid);
    const docSnap = await getDoc(reportRef);

    if (docSnap.exists()) {
      return JSON.parse(docSnap.data().workReportData);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

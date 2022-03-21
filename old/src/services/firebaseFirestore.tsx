import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { todoDataType } from '../models/todoDataType';
import { todoGetDataType } from '../models/todoGetDataType';
import { currentUserTyep } from '../types/currentUserTyep';
import { firebaseFirestore } from './firebase';

/**
 * Firestore: todoのデータ書込む
 */
export const addTodo = async (currentUser: currentUserTyep, todoData: todoDataType) => {
  if (currentUser) {
    const addTodoRef = collection(firebaseFirestore, `users/${currentUser.uid}/todos`);

    await addDoc(addTodoRef, todoData);
  }
};

/**
 * Firestore: todoのデータ更新
 */
export const updateTodo = async (currentUser: currentUserTyep, todoGetData: todoGetDataType) => {
  if (currentUser && todoGetData.id) {
    const { task, isCompleted, createdAt } = todoGetData;
    const updateTodoRef = doc(firebaseFirestore, `users/${currentUser.uid}/todos`, todoGetData.id);
    const updateTodoData: todoDataType = {
      task: task,
      isCompleted: isCompleted,
      createdAt: createdAt,
    };

    await updateDoc(updateTodoRef, updateTodoData);
    console.log('更新完了');
  }
};

/**
 * Firestore: todoのデータ削除
 */
export const deleteTodo = async (currentUser: currentUserTyep, todoGetData: todoGetDataType) => {
  if (currentUser && todoGetData.id) {
    const deleteTodoRef = doc(
      firebaseFirestore,
      `users/${currentUser.uid}/todos/${todoGetData.id}`
    );

    await deleteDoc(deleteTodoRef);
    console.log('削除完了');
  }
};

/**
 * Firestore: todoのバッチ処理
 */
export const batchTodo = (currentUser: currentUserTyep, todoGetDatas: todoGetDataType[]) => {
  if (currentUser) {
    const batch = writeBatch(firebaseFirestore);

    todoGetDatas.forEach(({ id, task, createdAt, isCompleted, isDeleted, isUpdated }, index) => {
      // console.log(`${index}: ${JSON.stringify(todoGetData)}`);

      // todoのデータ書込み
      if (id === undefined && isDeleted === false) {
        console.log(`${index}: 書き込み処理`);

        const setTodoRef = doc(collection(firebaseFirestore, `users/${currentUser.uid}/todos`));
        const setTodo: todoDataType = {
          task: task,
          isCompleted: isCompleted,
          createdAt: createdAt,
        };

        batch.set(setTodoRef, setTodo);
      }

      // // データの更新
      else if (typeof id === 'string' && isDeleted === false && isUpdated === true) {
        console.log(`${index}: 更新処理`);
  
        const updateTodoRef = doc(
          firebaseFirestore,
          `users/${currentUser.uid}/todos`,
          id
        );
        const updateTodoData: todoDataType = {
          task: task,
          isCompleted: isCompleted,
          createdAt: createdAt,
        };
        batch.update(updateTodoRef, updateTodoData);
      }

      // // todoのデータ削除
      else if (typeof id === 'string' && isDeleted === true && isUpdated === true) {
        console.log(`${index}: 削除処理`);
        const deleteTodoRef = doc(
          firebaseFirestore,
          `users/${currentUser.uid}/todos/${id}`
        );
        batch.delete(deleteTodoRef);
      }
      else {
        console.log(`${index}: その他`);
      }
    });

    return batch
    // (async () => {
    //   console.log(`バッチ処理を開始`);
    //   await batch.commit();
    // })();
  }
};

/**
 * Firestore: todoのデータを読込む
 */
export const fetchTodo = async (currentUser: currentUserTyep) => {
  if (currentUser) {
    const todoRef: CollectionReference<todoDataType | DocumentData> = collection(
      firebaseFirestore,
      `users/${currentUser.uid}/todos`
    );
    const todoQuery = query(todoRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(todoQuery);

    return snapshot.docs.map<todoGetDataType>((doc) => ({
      task: doc.data().task,
      createdAt: doc.data().createdAt,
      isCompleted: doc.data().isCompleted,
      id: doc.id,
      isDeleted: false,
      isUpdated: false,
    }));
  }
};

import { useState } from "react";
import styled from "styled-components";
import "./DiaryItem.css";

// styled-components를 이용하여 스타일링을 해주었다

const ItemElement = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 95%;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ItemDiv = styled.div`
  width: 70%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  overflow: auto;
`;

const ItemEdit = styled.input`
  width: 70%;
  height: 80px;
  font-size: 3rem;
  background-color: rgba(255, 255, 255, 0);
  border: 3px solid salmon;
  border-radius: 20px;
  text-align: center;
  overflow: auto;
`;

const ItemEditButton = styled.button`
  width: 80px;
  height: 60px;
  border-radius: 40px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ItemDeleteButton = styled.button`
  width: 80px;
  height: 60px;
  border-radius: 40px;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ItemQuitButton = styled.button`
  width: 80px;
  height: 60px;
  border-radius: 40px;
  font-size: 1.5rem;
  cursor: pointer;
`;

// 다이어리 아이템 컴포넌트
// 다이어리 메인의 deleteItem (아이템 삭제 함수), editItem (아이템 수정 함수), Item (해당하는 인덱스의 데이터), ItemList (DiaryItem이 가진 모든 Item의 데이터)를 받아 사용할 수 있다

const DiaryItem = ({ deleteItem, editItem, Item, ItemList }) => {
  // 데이터 수정을 위한 useState, 초기값은 수정하기 전에 가지고 있던 text 데이터이다
  const [editData, setEditData] = useState(Item.text);
  //   isEdit의 상태 (true,false)에 따라 html 요소를 제어하기 위해 사용된 useState
  const [isEdit, setEdit] = useState();

  //   함수가 실행되면 DiaryMain에서 받아온 deleteItem을 호출한다, 함수가 실행된 아이템의 id값을 인자로 넘긴다
  const remove = () => {
    deleteItem(Item.id);
  };

  // editToggle함수가 실행되면 현재 isEdit의 반대 (true <-> false)로 상태를 업데이트 시킨다

  const editToggle = () => {
    setEdit(!isEdit);
  };

  // 수정 버튼을 누르면 editToggle함수가 실행되어 isEdit의 상태가 바뀌고
  // 상태가 바뀜에 따라 컴포넌트의 return 요소가 바뀐다 (삼항 연산자 사용)

  const edit = () => {
    editToggle();
  };

  // 수정 버튼을 누른 뒤 값을 입력 후 완료 버튼을 누르면 호출되는 함수
  // 조건에 따라 분기처리를 진행한 뒤
  // 이상이 없다고 판단되면 isEdit의 상태를 바꾸는 editToggle함수를 실행시켜주고
  // DiaryMain에서 가져온 함수인 editItem을 실행, 현재 작업이 진행되는 Item의 id와 수정한 텍스트의 데이터인 editData를 인자로 넘긴다

  const change = () => {
    if (editData.length <= 0) {
      alert("데이터를 입력해주세요");
      return;
    }

    for (let key of ItemList) {
      if (key.text === editData) {
        alert("중복된 데이터는 입력하실 수 없습니다");
        return;
      }
    }

    editToggle();
    editItem(Item.id, editData);
  };

  // isEdit의 결과로 return된 editInput의 값을 업데이트 시켜준다

  const editInputData = (e) => {
    setEditData(e.target.value);
  };

  // 아이템의 수정을 취소할때 실행되는 함수

  const editQuit = () => {
    editToggle();
    setEditData(Item.text);
  };

  //   엔터키를 누르면 change함수가 실행된다

  const enterKey = (e) => {
    if (e.key === "Enter") {
      change();
    }
  };

  return (
    <ItemElement>
      {/* isEdit의 상태에 따라 다른 요소를 return 시킨다 */}
      {isEdit ? (
        <ItemEdit
          value={editData}
          onChange={editInputData}
          onKeyPress={enterKey}
        ></ItemEdit>
      ) : (
        <ItemDiv>{Item.text}</ItemDiv>
      )}
      {/* isEdit의 상태에 따라 다른 요소를 return 시킨다 */}
      {isEdit ? (
        <ItemEditButton className="EditButton" onClick={change}>
          완료
        </ItemEditButton>
      ) : (
        <ItemEditButton className="EditButton" onClick={edit}>
          변경
        </ItemEditButton>
      )}
      {/* isEdit의 상태에 따라 다른 요소를 return 시킨다 */}
      {isEdit ? (
        <ItemQuitButton className="QuitButton" onClick={editQuit}>
          취소
        </ItemQuitButton>
      ) : (
        <ItemDeleteButton className="QuitButton" onClick={remove}>
          삭제
        </ItemDeleteButton>
      )}
    </ItemElement>
  );
};

export default DiaryItem;

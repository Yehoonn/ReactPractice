import { useState, useRef } from "react";
import DiaryItem from "./DiaryItem";
import styled from "styled-components";
import "./DiaryMain.css";

// styled-components를 이용하여 스타일링을 해주었다

const DiaryBox = styled.div`
  width: 900px;
  height: 800px;
  background-color: rgba(100, 300, 80, 0.6);
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
`;

const DiaryInput = styled.input`
  width: 750px;
  height: 80px;
  border-radius: 20px;
  font-size: 2.5rem;
`;

const InputBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const InputButton = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 60px;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: lightgray;
`;

const ItemBox = styled.div`
  border-radius: 20px;
  width: 95%;
  height: 75%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

// 다이어리 메인 컴포넌트, Input과 button을 이용해 DiaryItem을 생성할 수 있다

const DiaryMain = () => {
  // Input 요소를 식별하기 위한 useRef

  const Input = useRef();

  // key 값을 관리하기 위한 useState이다

  const [key, setKey] = useState(1);

  // 투두리스트의 아이템들을 관리하기위해 쓰여진 useState이다

  const [Item, setItem] = useState([]);

  // input의 입력에 따른 상태를 관리하기 위한 useState이다

  const [input, setInput] = useState({
    text: "",
  });

  // 함수가 호출되면 Input박스를 focus해준다

  const inputBoxFocus = () => {
    Input.current.focus();
  };

  // 텍스트가 바뀔때마다 [e.target.name]에 해당하는 객체에 e.target.value를 저장한다

  const textChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // + button을 누르면 실행되는 함수
  // 중복된 일기를 생성하려하거나 1글자 미만의 일기를 생성하려하면 alert로 주의사항을 알려준 뒤 return한다
  // 모든 if문을 지나게 되면 위에 작성한 key state를 id의 value로 할당하고, 현재 입력한 input.text를 text의 value에 할당한다

  const ListAdd = () => {
    if (Item.findIndex((value) => value.text === input.text) !== -1) {
      alert("중복된 일기입니다");
      return;
    }

    if (input.text.length <= 0) {
      Input.current.focus();
      alert("데이터를 입력해주세요");
      return;
    }

    let newList = Item.concat({
      id: key,
      text: input.text,
    });
    setKey(key + 1);
    setItem(newList);
    setInput({ text: "" });
  };

  // 아이템을 삭제시켜주는 함수
  // 필터를 이용해 인자로 넘어온 key값과 모든 인덱스 값의 id를 대조한 후
  // 일치하는 아이템을 제외한 요소만 색출해 filterList에 할당한다
  // 그 이후엔 filterList를 setItem의 인자로 넘겨 아이템 리스트의 상태를 업데이트 시킨다

  const deleteItem = (key) => {
    const filterList = Item.filter((value) => value.id !== key);

    setItem(filterList);
  };

  // 이미 작성된 아이템의 내용을 수정시켜주는 함수
  // 인자로 넘어온 id값과 value.id가 같다면
  // 해당하는 인덱스 값의 텍스트를 인자로 넘어온 newText로 재할당한다
  // 재할당 후 아이템 리스트의 상태를 업데이트 시킨다

  const editItem = (id, newText) => {
    const editList = Item.map((value) =>
      value.id === id ? { ...value, text: newText } : value
    );

    setItem(editList);
  };

  // map 메서드를 사용하여 Item의 배열 요소만큼 DiaryItem 컴포넌트를 생성해준다
  // deleteItem, editItem, Item(해당하는 인덱스의 데이터(id,text)), ItemList (현재 DiaryMain이 가지고 있는 모든 데이터)를 자식이 사용할 수 있게 넘겨준다

  const ItemList = Item.map((value) => (
    <DiaryItem
      key={value.id}
      deleteItem={deleteItem}
      editItem={editItem}
      Item={value}
      ItemList={Item}
    />
  ));

  // 새로운 리스트를 만드려고 사용했지만
  // Item의 데이터를 기반으로 map 함수를 사용하여 태그를 그려주는 방식과 달리
  // 직접 태그를 넣어서 추가시키는 것은 얼핏 보면 정상적으로 작동하는 것 같지만
  // id값을 부여하거나 또 다른 데이터를 추가시키는데에는 에로사항이 있었다
  // 또한 그로 인해 아이템을 삭제할때 filter를 사용했음에도 문제가 생겼는데
  // 아이템이 5개라면 5번부터 1번까지 아이템을 삭제하는덴 오류가 없었지만
  // 5개인 상태에서 1번을 누르면 아이템이 다 사라진다
  // 2번을 누르면 2번을 포함해 2345번이 사라진다
  // 그래서 오류를 해결하던 중 어째서 이렇게 작동하는지 이해가 되질 않아 (내 생각엔 1번을 누르면 5까지 가기전에 냅다 필터링 해버리는 것 같다)
  // Item의 데이터 (배열의 갯수)만큼 태그를 그려주는 map을 사용하여 그려보니
  // filter안의 알고리즘이 거의 똑같음에도 아까와 같은 오류가 나지 않았다
  // 추후 질문을 해보고 확실한 답을 찾아야겠다

  // let newList = Item.concat(
  //   <ItemElement key={key}>
  //     <ItemDiv>{value.text}</ItemDiv>
  //     <ItemEditButton>변경</ItemEditButton>
  //     <ItemDeleteButton
  //       onClick={() => {
  //         deleteItem(key);
  //       }}
  //     >
  //       삭제
  //     </ItemDeleteButton>
  //   </ItemElement>
  // );

  // 엔터키를 누르면 ListAdd함수가 실행된다

  const EnterPress = (e) => {
    if (e.key === "Enter") {
      ListAdd();
    }
  };

  return (
    <>
      <DiaryBox>
        <InputBox>
          <DiaryInput
            ref={Input}
            name="text"
            onChange={textChange}
            value={input.text}
            onKeyPress={EnterPress}
            onClick={inputBoxFocus}
          />
          <InputButton onClick={ListAdd} className="addButton">
            <i class="fa-solid fa-plus"></i>
          </InputButton>
        </InputBox>
        <ItemBox>{ItemList}</ItemBox>
      </DiaryBox>
    </>
  );
};

export default DiaryMain;

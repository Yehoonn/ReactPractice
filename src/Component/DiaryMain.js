import { useState, useRef, useCallback } from "react";
import styled from "styled-components";

const DiaryBox = styled.div`
  width: 900px;
  height: 800px;
  background-color: salmon;
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

const DiaryMain = () => {
  const Input = useRef();

  const [input, setInput] = useState({
    text: "",
  });

  const [key, setKey] = useState(2);

  const [Item, setItem] = useState([]);

  const inputBoxFocus = () => {
    Input.current.focus();
  };

  const textChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const deleteItem = (key) => {
    const filterList = Item.filter((value) => value.id !== key);

    setItem(filterList);
  };

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

  const EnterPress = (e) => {
    if (e.key === "Enter") {
      ListAdd();
    }
  };

  const ItemList = Item.map((value) => (
    <ItemElement key={value.id}>
      <ItemDiv>{value.text}</ItemDiv>
      <ItemEditButton>변경</ItemEditButton>
      <ItemDeleteButton
        onClick={() => {
          deleteItem(value.id);
        }}
      >
        삭제
      </ItemDeleteButton>
    </ItemElement>
  ));

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
          <InputButton onClick={ListAdd}>
            <i class="fa-solid fa-plus"></i>
          </InputButton>
        </InputBox>
        <ItemBox>{ItemList}</ItemBox>
      </DiaryBox>
    </>
  );
};

export default DiaryMain;

import { useState, useRef } from "react";
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
  const ItemEle = useRef();

  const [input, setInput] = useState({
    text: "",
  });
  const [Item, setItem] = useState([]);

  const [key, setKey] = useState(1);

  const inputBoxFocus = () => {
    Input.current.focus();
  };

  const textChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const deleteItem = (id) => {
    const filterItem = Item.filter((value) => value.key !== id);

    setItem(filterItem);
  };

  const ListAdd = () => {
    if (input.text.length <= 0) {
      Input.current.focus();
      alert("데이터를 입력해주세요");
      return;
    }

    let newList = Item.concat(
      <ItemElement key={key} ref={ItemEle}>
        <ItemDiv>{input.text}</ItemDiv>
        <ItemEditButton>변경</ItemEditButton>
        <ItemDeleteButton
          onClick={() => {
            deleteItem(key);
          }}
        >
          삭제
        </ItemDeleteButton>
      </ItemElement>
    );
    setKey(key + 1);
    setItem(newList);
    setInput({ text: "" });
  };

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
          <InputButton onClick={ListAdd}>
            <i class="fa-solid fa-plus"></i>
          </InputButton>
        </InputBox>
        <ItemBox>{Item}</ItemBox>
      </DiaryBox>
    </>
  );
};

export default DiaryMain;

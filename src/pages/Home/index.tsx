import React, {
  useCallback,
  FormEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';

import { Container, ContentForm, ContentTodoList } from './styles';

interface ITodo {
  id: string;
  text: string;
  done: boolean;
}

const Home: React.FC = () => {
  const inputRef = useRef({} as HTMLInputElement);

  const [errored, setErrored] = useState('');
  const [todos, setTodos] = useState<ITodo[]>(() => {
    const storageTodos = localStorage.getItem('@TodoLuby:Todos');

    if (storageTodos) {
      return JSON.parse(storageTodos);
    }

    return [];
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('@TodoLuby:Todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { value } = inputRef.current;

      try {
        const data = { value };

        const schema = Yup.object().shape({
          value: Yup.string().min(5, 'Mínimo de 5 caracteres.').trim(),
        });

        await schema.validate(data, { abortEarly: false });

        setErrored('');

        setTodos(prev => [...prev, { id: uuidv4(), text: value, done: false }]);
        inputRef.current.value = '';
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationErrors(error);

          setErrored(erros.value);
        }
      }
    },
    [],
  );

  const handleDeleteItem = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const handleDoneItem = useCallback(
    (id: string, status: boolean) => {
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          todo.done = !status;
        }
        return todo;
      });

      setTodos(newTodos);
    },
    [todos],
  );

  return (
    <Container>
      <Header />

      <ContentForm isInvalid={!!errored}>
        <form onSubmit={handleSubmit}>
          <input ref={inputRef} />
          <button type="submit">Adicionar</button>
        </form>

        {errored && <h3>{errored}</h3>}

        {todos.map(todo => (
          <ContentTodoList key={todo.id} disabled={todo.done}>
            <p>{todo.text}</p>
            <div>
              <button onClick={() => handleDeleteItem(todo.id)} type="button">
                Apagar
              </button>
              <input
                type="checkbox"
                onClick={() => handleDoneItem(todo.id, todo.done)}
                checked={todo.done}
              />
            </div>
          </ContentTodoList>
        ))}
      </ContentForm>
    </Container>
  );
};

export default Home;

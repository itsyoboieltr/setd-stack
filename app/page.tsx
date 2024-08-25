'use client';

import { useState } from 'react';
import { Create } from '@sinclair/typebox/value';
import { useMutation, useQuery } from '@tanstack/react-query';
import Todo from '@/components/ui/todo';
import { todoSchemas, todoInsertSchema } from '@/server/todo/schema';
import { api } from '@/lib/utils';

export default function Home() {
  const [todo, setTodo] = useState(Create(todoInsertSchema));

  const todoQuery = useQuery({
    queryKey: ['todo'],
    queryFn: async () => (await api.todo.get()).data!,
  });

  const todoAdd = useMutation({
    mutationFn: async () => await api.todo.post(todo),
    onSuccess: () => setTodo(Create(todoInsertSchema)),
  });

  return (
    <div className={'mx-auto p-4 text-center text-gray-700'}>
      <div className={'flex flex-col gap-2'}>
        {todoQuery.data?.map((todo) => (
          <Todo key={todo.id} id={todo.id} data={todo.data} />
        ))}
      </div>
      <br />
      <div className={'flex flex-row justify-center gap-4'}>
        <input
          className={'rounded border-2 border-black px-2 py-1'}
          type={'text'}
          value={todo.data}
          onInput={({ currentTarget: { value: data } }) => setTodo({ data })}
          onKeyUp={({ key }) => {
            if (
              key === 'Enter' &&
              !todoAdd.isPending &&
              todoSchemas.insert.safeParse(todo).success
            )
              todoAdd.mutate();
          }}
        />
        <button
          className={
            'rounded border-2 border-black bg-gray-300 px-4 transition-all hover:bg-gray-400 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-400'
          }
          disabled={
            todoAdd.isPending || !todoSchemas.insert.safeParse(todo).success
          }
          onClick={() => todoAdd.mutate()}>
          Submit
        </button>
      </div>
      <br />
      <pre>DrizzleORM + Bun + ElysiaJS + NextJS + TailwindCSS</pre>
    </div>
  );
}

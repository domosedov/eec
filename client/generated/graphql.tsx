import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  helloWorld: Scalars['String'];
  users: Array<User>;
  user?: Maybe<User>;
  getUsersByRole: Array<User>;
  me?: Maybe<User>;
  profiles: Array<Profile>;
  vacancies: Array<Vacancy>;
  todos: Array<Todo>;
  todo?: Maybe<Todo>;
  cities: Array<City>;
  metros: Array<Metro>;
  statuses: Array<Status>;
  students: Array<Student>;
  subjects: Array<Subject>;
  marks: Array<Mark>;
  places: Array<Place>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryGetUsersByRoleArgs = {
  role?: Maybe<Role>;
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  login: Scalars['String'];
  email: Scalars['EmailAddress'];
  registeredAt: Scalars['DateTime'];
  role: Role;
  isConfirmed: Scalars['Boolean'];
  isBanned: Scalars['Boolean'];
};



/** user Role type */
export enum Role {
  Guest = 'GUEST',
  Admin = 'ADMIN',
  Tutor = 'TUTOR'
}

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID'];
  isPublished: Scalars['Boolean'];
  firstName: Scalars['String'];
  middleName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  birthYear: Scalars['Int'];
  careerStartYear: Scalars['Int'];
  gender: Gender;
  area?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  education: Scalars['String'];
  hourlyRate: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  subjects: Array<Subject>;
  students: Array<Student>;
  places: Array<Place>;
  marks: Array<Mark>;
  city: City;
  metro?: Maybe<Metro>;
  status: Status;
};

/** Пол человека */
export enum Gender {
  None = 'NONE',
  Men = 'MEN',
  Women = 'WOMEN',
  Another = 'ANOTHER',
  All = 'ALL'
}

export type Subject = {
  __typename?: 'Subject';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Place = {
  __typename?: 'Place';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mark = {
  __typename?: 'Mark';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type City = {
  __typename?: 'City';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Metro = {
  __typename?: 'Metro';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Vacancy = {
  __typename?: 'Vacancy';
  id: Scalars['ID'];
  isPublished: Scalars['Boolean'];
  isCompleted: Scalars['Boolean'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  area?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  goal: Scalars['String'];
  hourlyRate: Scalars['Int'];
  gender: Gender;
  createdAt: Scalars['DateTime'];
  city: City;
  metro?: Maybe<Metro>;
  place: Place;
  subject: Subject;
  student: Student;
  selectedProfileId?: Maybe<Scalars['ID']>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  isCompleted: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createJopa: User;
  register: User;
  confirmUser: Scalars['Boolean'];
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  changePassword?: Maybe<User>;
  forgotPassword: Scalars['Boolean'];
  uploadFile: Scalars['Boolean'];
  addTodo: Todo;
};


export type MutationCreateJopaArgs = {
  data: RegisterInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  loginOrEmail: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationAddTodoArgs = {
  description?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type RegisterInput = {
  password: Scalars['String'];
  login: Scalars['String'];
  email: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type Subscription = {
  __typename?: 'Subscription';
  newTodo: Todo;
};

export type ConfirmUserRegisterMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserRegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type UserRegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type UserRegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'login' | 'email' | 'role' | 'registeredAt'>
  ) }
);

export type GetFormOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormOptionsQuery = (
  { __typename?: 'Query' }
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'id' | 'name'>
  )>, metros: Array<(
    { __typename?: 'Metro' }
    & Pick<Metro, 'id' | 'name'>
  )>, places: Array<(
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'name'>
  )>, subjects: Array<(
    { __typename?: 'Subject' }
    & Pick<Subject, 'id' | 'name'>
  )>, students: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'name'>
  )> }
);

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'login' | 'email'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  loginOrEmail: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'login' | 'email' | 'registeredAt' | 'role'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'login' | 'email' | 'registeredAt' | 'role'>
  )> }
);

export type GetTodoByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetTodoByIdQuery = (
  { __typename?: 'Query' }
  & { todo?: Maybe<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'isCompleted'>
  )> }
);

export type GetAllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'isCompleted'>
  )> }
);

export type NewTodoSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewTodoSubscription = (
  { __typename?: 'Subscription' }
  & { newTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description'>
  ) }
);

export type AddTodoMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type AddTodoMutation = (
  { __typename?: 'Mutation' }
  & { addTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'title' | 'description' | 'isCompleted'>
  ) }
);


export const ConfirmUserRegisterDocument = gql`
    mutation ConfirmUserRegister($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserRegisterMutationFn = Apollo.MutationFunction<ConfirmUserRegisterMutation, ConfirmUserRegisterMutationVariables>;

/**
 * __useConfirmUserRegisterMutation__
 *
 * To run a mutation, you first call `useConfirmUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserRegisterMutation, { data, loading, error }] = useConfirmUserRegisterMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserRegisterMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserRegisterMutation, ConfirmUserRegisterMutationVariables>) {
        return Apollo.useMutation<ConfirmUserRegisterMutation, ConfirmUserRegisterMutationVariables>(ConfirmUserRegisterDocument, baseOptions);
      }
export type ConfirmUserRegisterMutationHookResult = ReturnType<typeof useConfirmUserRegisterMutation>;
export type ConfirmUserRegisterMutationResult = Apollo.MutationResult<ConfirmUserRegisterMutation>;
export type ConfirmUserRegisterMutationOptions = Apollo.BaseMutationOptions<ConfirmUserRegisterMutation, ConfirmUserRegisterMutationVariables>;
export const UserRegisterDocument = gql`
    mutation UserRegister($data: RegisterInput!) {
  register(data: $data) {
    id
    login
    email
    role
    registeredAt
  }
}
    `;
export type UserRegisterMutationFn = Apollo.MutationFunction<UserRegisterMutation, UserRegisterMutationVariables>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUserRegisterMutation(baseOptions?: Apollo.MutationHookOptions<UserRegisterMutation, UserRegisterMutationVariables>) {
        return Apollo.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument, baseOptions);
      }
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<UserRegisterMutation, UserRegisterMutationVariables>;
export const GetFormOptionsDocument = gql`
    query GetFormOptions {
  cities {
    id
    name
  }
  metros {
    id
    name
  }
  places {
    id
    name
  }
  subjects {
    id
    name
  }
  students {
    id
    name
  }
}
    `;

/**
 * __useGetFormOptionsQuery__
 *
 * To run a query within a React component, call `useGetFormOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFormOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetFormOptionsQuery, GetFormOptionsQueryVariables>) {
        return Apollo.useQuery<GetFormOptionsQuery, GetFormOptionsQueryVariables>(GetFormOptionsDocument, baseOptions);
      }
export function useGetFormOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormOptionsQuery, GetFormOptionsQueryVariables>) {
          return Apollo.useLazyQuery<GetFormOptionsQuery, GetFormOptionsQueryVariables>(GetFormOptionsDocument, baseOptions);
        }
export type GetFormOptionsQueryHookResult = ReturnType<typeof useGetFormOptionsQuery>;
export type GetFormOptionsLazyQueryHookResult = ReturnType<typeof useGetFormOptionsLazyQuery>;
export type GetFormOptionsQueryResult = Apollo.QueryResult<GetFormOptionsQuery, GetFormOptionsQueryVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  users {
    id
    login
    email
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $loginOrEmail: String!) {
  login(password: $password, loginOrEmail: $loginOrEmail) {
    login
    email
    registeredAt
    role
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      loginOrEmail: // value for 'loginOrEmail'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    login
    email
    registeredAt
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetTodoByIdDocument = gql`
    query GetTodoById($id: ID!) {
  todo(id: $id) {
    id
    title
    description
    isCompleted
  }
}
    `;

/**
 * __useGetTodoByIdQuery__
 *
 * To run a query within a React component, call `useGetTodoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodoByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTodoByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTodoByIdQuery, GetTodoByIdQueryVariables>) {
        return Apollo.useQuery<GetTodoByIdQuery, GetTodoByIdQueryVariables>(GetTodoByIdDocument, baseOptions);
      }
export function useGetTodoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodoByIdQuery, GetTodoByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetTodoByIdQuery, GetTodoByIdQueryVariables>(GetTodoByIdDocument, baseOptions);
        }
export type GetTodoByIdQueryHookResult = ReturnType<typeof useGetTodoByIdQuery>;
export type GetTodoByIdLazyQueryHookResult = ReturnType<typeof useGetTodoByIdLazyQuery>;
export type GetTodoByIdQueryResult = Apollo.QueryResult<GetTodoByIdQuery, GetTodoByIdQueryVariables>;
export const GetAllTodosDocument = gql`
    query GetAllTodos {
  todos {
    id
    title
    description
    isCompleted
  }
}
    `;

/**
 * __useGetAllTodosQuery__
 *
 * To run a query within a React component, call `useGetAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTodosQuery, GetAllTodosQueryVariables>) {
        return Apollo.useQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, baseOptions);
      }
export function useGetAllTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTodosQuery, GetAllTodosQueryVariables>) {
          return Apollo.useLazyQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, baseOptions);
        }
export type GetAllTodosQueryHookResult = ReturnType<typeof useGetAllTodosQuery>;
export type GetAllTodosLazyQueryHookResult = ReturnType<typeof useGetAllTodosLazyQuery>;
export type GetAllTodosQueryResult = Apollo.QueryResult<GetAllTodosQuery, GetAllTodosQueryVariables>;
export const NewTodoDocument = gql`
    subscription newTodo {
  newTodo {
    id
    title
    description
  }
}
    `;

/**
 * __useNewTodoSubscription__
 *
 * To run a query within a React component, call `useNewTodoSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewTodoSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewTodoSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewTodoSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewTodoSubscription, NewTodoSubscriptionVariables>) {
        return Apollo.useSubscription<NewTodoSubscription, NewTodoSubscriptionVariables>(NewTodoDocument, baseOptions);
      }
export type NewTodoSubscriptionHookResult = ReturnType<typeof useNewTodoSubscription>;
export type NewTodoSubscriptionResult = Apollo.SubscriptionResult<NewTodoSubscription>;
export const AddTodoDocument = gql`
    mutation AddTodo($title: String!, $description: String!) {
  addTodo(title: $title, description: $description) {
    id
    title
    description
    isCompleted
  }
}
    `;
export type AddTodoMutationFn = Apollo.MutationFunction<AddTodoMutation, AddTodoMutationVariables>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddTodoMutation(baseOptions?: Apollo.MutationHookOptions<AddTodoMutation, AddTodoMutationVariables>) {
        return Apollo.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, baseOptions);
      }
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = Apollo.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = Apollo.BaseMutationOptions<AddTodoMutation, AddTodoMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    
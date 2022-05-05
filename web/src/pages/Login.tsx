import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import fetchGraphQL from '../../fecthGraphQL'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Stack,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'

type FormData = {
  email: string,
  password: string
}

const schema = yup.object({
  email: yup.string().email('O email fornecido é inválido').required('O email é obrigatório'),
  password: yup.string().min(6, 'A senha deve conter ao menos 6 caracteres').required('A senha é obrigatória')
}).required('Os dados de login são obrigatórios')

export const Login = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    let isMounted = true

    const handleLogin = async () => {
      const response = await fetchGraphQL(`
      mutation a {
        loginUser (input: {
          email: "tester@mail.com",
          password: "123456"
        }) {
          token
          error
        }
      }
      `, {})

      if (!isMounted) {
        return
      }

      setToken(response.data.loginUser.token)
    }

    handleLogin()

    return () => {
      isMounted = false
    }
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: FormData) => {
    console.log(token)
    console.log('chamar o relay e passar: ', data)
  }

  return (
    <Stack
      w={['100%', '30em']}
      p={['1em']}
      display={'flex'}
      flexDir={'column'}
      spacing={3}
    >
      <Text
        fontSize={['2em']}
        fontWeight={['bold']}
      >
        Login
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={!!errors.email}
        >
          <FormLabel mt={'0.5em'} htmlFor='email'>E-mail</FormLabel>
          <Input
            placeholder="Insira o seu e-mail"
            id="email"
            {...register('email')}
          />

          {
            errors.email && (
              <FormErrorMessage>
                {errors.email.message}
              </FormErrorMessage>
            )
          }
        </FormControl>

        <FormControl
          isInvalid={!!errors.password}
        >
          <FormLabel mt={'0.5em'} htmlFor='password'>Senha</FormLabel>
          <Input placeholder="Insira a sua senha"
            type='password'
            min={6}
            id="password"
            {...register('password')}
          />

          {
            errors.password && (
              <FormErrorMessage>
                {errors.password.message}
              </FormErrorMessage>
            )
          }
        </FormControl>

        <Button
          flex={1}
          type="submit"
          variant={'solid'}
          mt='0.5em'
        >
          Entrar
        </Button>

      </form>

    </Stack>
  )
}
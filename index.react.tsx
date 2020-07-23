import React, { useMemo } from 'react'

import { Form, Input, Text, SafeArea, View } from './dist'

const App = () => {
  const options = useMemo( () => {
    return [ { label: 'Elf', value: 'elf' }, { label: 'Human', value: 'human' } ]
  }, [] )

  return (
    <SafeArea flex>
      <Form on={ { submit: console.log } }>
        <View align margin={ { top: 10, horizontal: 10 } } radius={5} bg='white' shadow={5} padding={ { horizontal: 10, vertical: 20 } }>
          <Text margin={ { right: 'auto' } }>Formulário de Personagem</Text>
          <View flex={ { direction: 'row' } } margin={ { vertical: 10 } } style={ { elevation: 6 } } align>
            <View flex={ { direction: 'column' } } margin={ { right: 10 } }>
              <Text>Name:</Text>
            </View>
            <View flex='column'>
              <Input.Text name='name' bg='white' shadow={5} radius={5} padding={ { vertical: 2.5, horizontal: 10 } }/>
            </View>
          </View>
          <View flex={ { direction: 'row' } } index={1} margin={ { vertical: 10 } } style={ { elevation: 6 } } align>
            <View flex={ { direction: 'column' } } margin={ { right: 10 } }>
              <Text>Race:</Text>
            </View>
            <View flex='column'>
              <Input.Select name='race' styles={ {
                wrapper: { bg: 'white', radius: 5, shadow: 5 },
                item: { padding: { vertical: 5, horizontal: 10 } }
              } } options={options} on={ { change: console.log } }>
                <Input.Select.Context.Consumer >
                  { ( { value, isOpen, label } ) => {
                    return (
                      <View flex={ { direction: 'row' } } justify='between' bg='white' radius={5} shadow={5} padding={ { vertical: 7.5, horizontal: 10 } }>
                        { !value &&
                        <Text>Selecione</Text> ||
                        <Text>{label}</Text>
                        }
                        <Text margin={ { right: 10 } } transform={ { rotate: '-90deg' } }>{ isOpen ? '>' : '<' }</Text>
                      </View>
                    )
                  } }
                </Input.Select.Context.Consumer>
              </Input.Select>
            </View>
          </View>
          <Input.Submit bg='white' radius={5} margin={ { right: 'auto' } } shadow={5} padding={ { vertical: 5, horizontal: 10 } }>
            <Text>Salvar Personagem</Text>
          </Input.Submit>
        </View>
      </Form>
    </SafeArea>
  )
}

export default App

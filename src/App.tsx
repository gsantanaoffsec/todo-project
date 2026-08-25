import Text from './components/text'
import Icon from './components/icon'
import TrashIcon from './assets/icons/trash.svg?react'
import CheckIcon from './assets/icons/check.svg?react'
import PencilIcon from './assets/icons/pencil.svg?react'
import PlusIcon from './assets/icons/plus.svg?react'
import SpinnerIcon from './assets/icons/spinner.svg?react'
import RegularIconX from './assets/icons/xregular.svg?react'
import Badge from './components/badge'
import Button from './components/button'
import ButtonIcon from './components/button-icon'
import InputText from './components/input-text'
import InputCheckBox from './components/input-checkbox'
import Card from './components/card'
import Container from './components/container'

export default function App() {
  return (
    <Container>
      <div className="grid gap-10">
        <div className="flex flex-col gap-2">
          <Text variant="body-sm-bold" className="text-pink-base">
            Olá Mundo!
          </Text>
          <Text className="text-green-base">Olá Mundo!</Text>
          <Text variant="body-md-bold">Olá Mundo!</Text>
        </div>

        <div className="flex gap-1">
          <Icon svg={TrashIcon} />
          <Icon svg={CheckIcon} />
          <Icon svg={PlusIcon} />
          <Icon svg={SpinnerIcon} animate />
          <Icon svg={PencilIcon} />
          <Icon svg={RegularIconX} />
        </div>

        <div>
          <Badge variant="secondary">5</Badge>
          <Badge variant="primary">2 de 5</Badge>
        </div>

        <div>
          <Button icon={PlusIcon}>Nova Tarefa</Button>
        </div>

        <div className="flex gap-1">
          <ButtonIcon icon={TrashIcon} />
          <ButtonIcon icon={TrashIcon} variant="secondary" />
          <ButtonIcon icon={TrashIcon} variant="tertiary" />
        </div>

        <div>
          <InputText />
        </div>

        <div>
          <InputCheckBox />
        </div>

        <div>
          <Card className="md">Hello World!</Card>
        </div>
      </div>
    </Container>
  )
}

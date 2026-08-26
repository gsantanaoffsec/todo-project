import Card from '../components/card'
import Icon from '../components/icon'
import Text from '../components/text'
import Badge from '../components/badge'
import Button from '../components/button'
import Skeleton from '../components/skeleton'
import Container from '../components/container'
import InputText from '../components/input-text'
import ButtonIcon from '../components/button-icon'
import PlusIcon from '../assets/icons/plus.svg?react'
import CheckIcon from '../assets/icons/check.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import InputCheckBox from '../components/input-checkbox'
import PencilIcon from '../assets/icons/pencil.svg?react'
import SpinnerIcon from '../assets/icons/spinner.svg?react'
import RegularIconX from '../assets/icons/xregular.svg?react'

export default function PageComponents() {
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

        <div className="flex gap-1">
          <Badge variant="secondary">5</Badge>
          <Badge variant="primary">2 de 5</Badge>
          <Badge loading>5</Badge>
        </div>

        <div>
          <Button icon={PlusIcon}>Nova Tarefa</Button>
        </div>

        <div className="flex gap-1">
          <ButtonIcon icon={TrashIcon} />
          <ButtonIcon icon={TrashIcon} variant="secondary" />
          <ButtonIcon icon={TrashIcon} variant="tertiary" />
          <ButtonIcon icon={TrashIcon} loading />
        </div>

        <div>
          <InputText />
        </div>

        <div>
          <InputCheckBox />
          <InputCheckBox loading />
        </div>

        <div>
          <Card size="md">Hello World!</Card>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="w-96 h-6" />
        </div>
      </div>
    </Container>
  )
}

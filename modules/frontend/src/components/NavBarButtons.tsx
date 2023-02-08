import { Avatar, Box } from 'native-base'

// TODO get user initials
// TODO on click avatar
// TODO admin [...] button on projects screen
export const NavBarButtons = (): React.ReactNode => {
  return (
    <Box px={4}>
      <Avatar size="sm" bg="cyan.600">
        AA
      </Avatar>
    </Box>
  )
}

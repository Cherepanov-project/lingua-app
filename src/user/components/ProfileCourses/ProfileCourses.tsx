import { Box } from '@mui/material'
import { Container } from '@mui/material'
import { Grid } from '@mui/material'
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { ProfileSidebarLeft } from '../Profile/ProfileSidebarLeft'
import { FilterSelect } from './FilterSelect'

import { CourseCard } from './CourseCard'
import {
  useGetCoursesQuery,
  useGetLanguagesQuery,
  useGetLevelsQuery,
} from '../../../shared/api/languagesApi'
import type { LanguageOption } from '../../../shared/types/language'
import type { LevelOptions } from '../../../shared/types/levels'

import type { Course } from '../../../shared/types/course'

const ProfileCourses = () => {
  const { data: languages = [] } = useGetLanguagesQuery()
  const { data: levels = [] } = useGetLevelsQuery()
  const { data: courses = [] } = useGetCoursesQuery({})

  return (
    <Container maxWidth={'xl'} disableGutters>
      <Stack direction={'row'} useFlexGap sx={{ height: '100vh', backgroundColor: 'white' }}>
        <ProfileSidebarLeft />
        <Stack
          sx={{
            padding: '70px',
            flexGrow: '1',
            overflowY: 'scroll',
            scrollbarColor: '#d9e0ff transparent',
          }}
          component={'main'}
          useFlexGap
          spacing={'35px'}
        >
          <Box component={'header'}>
            <Typography variant="h4">Выберите курс для изучения</Typography>
            <Typography variant="body1">
              Найдите подходящий уровень и начните учиться уже сегодня
            </Typography>
          </Box>

          <Stack
            sx={{ justifyContent: 'space-between' }}
            direction={'row'}
            spacing={'45px'}
            useFlexGap
          >
            <FilterSelect<LanguageOption, 'code'>
              optionsList={languages}
              displayLabelKey="label"
              valueKey="code"
              placeholder={'Выбери язык'}
            />
            <FilterSelect<LevelOptions, 'id'>
              optionsList={levels}
              displayLabelKey="label"
              valueKey="id"
              placeholder={'Выбери свой уровень'}
            />
          </Stack>

          <Grid container rowSpacing={'35px'} columnSpacing={'45px'}>
            {courses.map((course: Course) => {
              return (
                <Grid key={course.id} size={4}>
                  <CourseCard
                    language={course.language}
                    level={course.level}
                    description={course.description}
                    amountTime={course.amountTime}
                    progress={Math.floor(Math.random() * 100)}
                  />
                </Grid>
              )
            })}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  )
}

export { ProfileCourses }

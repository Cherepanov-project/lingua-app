import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { FilterSelect } from '../Profile/FilterSelect'
import { CourseCard } from '../Profile/CourseCard'
import type { LanguageOption } from '../../../shared/types/language'
import type { LevelOptions } from '../../../shared/types/levels'
import type { Course } from '../../../shared/types/course'
import {
  useGetCoursesQuery,
  useGetLanguagesQuery,
  useGetLevelsQuery,
} from '../../../shared/api/languagesApi'

const ProfileCoursesPage = () => {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string | ''>('')
  const [selectedLevelId, setSelectedLevelId] = useState<string | ''>('')

  const { data: languages = [] } = useGetLanguagesQuery()
  const { data: levels = [] } = useGetLevelsQuery()
  const { data: courses = [] } = useGetCoursesQuery({})

  const filteredCourses = useMemo(() => {
    return courses.filter((course: Course) => {
      const selectedLanguageObj = languages.find((lang) => lang.code === selectedLanguageCode)
      const selectedLevelObj = levels.find((level) => level.id.toString() === selectedLevelId)
      const selectedLanguageLabel = selectedLanguageObj?.label
      const selectedLevelLabel = selectedLevelObj?.label
      const languageMatch = selectedLanguageCode === '' || course.language === selectedLanguageLabel
      const levelMatch = selectedLevelId === '' || course.level === selectedLevelLabel
      return languageMatch && levelMatch
    })
  }, [courses, selectedLanguageCode, selectedLevelId, languages, levels])

  return (
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

      <Stack sx={{ justifyContent: 'space-between' }} direction={'row'} spacing={'45px'} useFlexGap>
        <FilterSelect<LanguageOption, 'code'>
          optionsList={languages}
          displayLabelKey="label"
          valueKey="code"
          placeholder={'Выбери язык'}
          selectedValue={selectedLanguageCode}
          onSelectionChange={(value) => {
            if (value === '') {
              setSelectedLanguageCode('')
            } else if (typeof value === 'string') {
              setSelectedLanguageCode(value)
            }
          }}
        />

        <FilterSelect<LevelOptions, 'id'>
          optionsList={levels}
          displayLabelKey="label"
          valueKey="id"
          placeholder={'Выбери свой уровень'}
          selectedValue={selectedLevelId}
          onSelectionChange={(value) => {
            if (value === '') {
              setSelectedLevelId('')
            } else if (typeof value === 'string') {
              setSelectedLevelId(value)
            } else if (typeof value === 'number') {
              setSelectedLevelId(value.toString())
            }
          }}
        />
      </Stack>

      <Grid container rowSpacing={'35px'} columnSpacing={'45px'}>
        {filteredCourses.map((course: Course) => (
          <Grid key={course.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CourseCard
              language={course.language}
              level={course.level}
              description={course.description || 'Описание курса'}
              amountTime={course.amountTime || 0}
              progress={Math.floor(Math.random() * 100)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export { ProfileCoursesPage }

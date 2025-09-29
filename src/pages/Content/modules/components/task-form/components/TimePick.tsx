import React, { useMemo } from 'react';
import CourseDropdown from '../../course-dropdown';
import { DropdownChoice } from '../../course-dropdown/CourseDropdown';
import useOptions from '../../../hooks/useOptions';

function fmtTime(minutes: number): string {
  const h =
    Math.floor(minutes / 60) % 12 === 0 ? 12 : Math.floor(minutes / 60) % 12;
  const mm = (minutes % 60 < 10 ? '0' : '') + (minutes % 60);
  const ampm = minutes / 60 >= 12 ? 'PM' : 'AM';
  return `${h}:${mm} ${ampm}`;
}

function fmtTime24(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const mm = (minutes % 60 < 10 ? '0' : '') + (minutes % 60);
  return `${h.toString().padStart(2, '0')}:${mm}`;
}

type Props = {
  color?: string;
  dark?: boolean;
  selected: string;
  setSelected: (value: string) => void;
  use24Hour?: boolean;
};

export default function TimePick({
  color,
  dark,
  selected,
  setSelected,
  use24Hour = false,
}: Props): JSX.Element {
  const timeChoices = useMemo(() => {
    const times: DropdownChoice[] = [];
    const { state: options } = useOptions();
    const formatFunction = options.clock_24hr ? fmtTime24 : fmtTime;
    
    for (let i = 0; i < 48; i++) {
      times.push({
        id: i * 30 + '',
        name: formatFunction(i * 30),
        color: dark ? 'var(--tfc-dark-mode-text-primary)' : '#2d3b45',
      });
    }

    times.push({
      id: '1439',
      name: formatFunction(1439),
      color: dark ? 'var(--tfc-dark-mode-text-primary)' : '#2d3b45',
    });

    return times;
  }, [use24Hour, dark]);

  function chooseTime(id: string) {
    setSelected(id);
  }

  return (
    <CourseDropdown
      choices={timeChoices}
      defaultColor={color}
      instructureStyle
      maxHeight={150}
      noDefault
      onCoursePage={false}
      selectedId={selected}
      setChoice={chooseTime}
      zIndex={30} // above the course dropdown under this
    />
  );
}

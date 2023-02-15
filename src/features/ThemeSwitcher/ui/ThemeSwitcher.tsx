import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';

interface ThemeSwithcerProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwithcerProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button theme={ButtonTheme.CLEAR} className={classNames('', {}, [className])} onClick={toggleTheme}>
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>

    );
});

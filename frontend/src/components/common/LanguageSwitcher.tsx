import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGE_OPTIONS = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
] as const;

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: 'es' | 'en') => {
    void i18n.changeLanguage(lang);
    handleClose();
  };

  const currentLabel = LANGUAGE_OPTIONS.find(({ value }) => value === currentLanguage)?.label ?? t('app.language');

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<LanguageRoundedIcon />}
        onClick={handleClick}
        sx={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}
      >
        {currentLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleLanguageChange(option.value)}
            selected={currentLanguage === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

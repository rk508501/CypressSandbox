# Windows Cleanup Cheat Sheet

## Quick Commands

### Disk Cleanup
- `cleanmgr` - Basic disk cleanup utility
- `cleanmgr /sageset:99` - Configure cleanup settings
- `cleanmgr /sagerun:99` - Run saved cleanup settings

### Temporary Files
- `%temp%` - Open temp folder in File Explorer
- `del /f /s /q %temp%\*.*` - Delete temp files
- `rd /s /q %temp%` - Remove temp directory

### System Files
- `del /f /s /q %systemroot%\*.tmp`
- `del /f /s /q %systemroot%\*._mp`
- `del /f /s /q %systemroot%\*.log`
- `del /f /s /q %systemroot%\*.gid`
- `del /f /s /q %systemroot%\*.chk`
- `del /f /s /q %systemroot%\*.old`

### Windows Update Cleanup
- `DISM /Online /Cleanup-Image /StartComponentCleanup` - Clean Windows components
- `DISM /Online /Cleanup-Image /RestoreHealth` - Repair Windows image

## GUI Methods

### Storage Sense
1. Settings → System → Storage
2. Turn on Storage Sense
3. Configure cleanup schedule

### Disk Cleanup GUI
1. Right-click drive
2. Properties → Disk Cleanup
3. Clean up system files

## Important Folders to Check

- `C:\Windows\Temp`
- `C:\Windows\Prefetch`
- `C:\Users\[username]\AppData\Local\Temp`
- `C:\Windows\SoftwareDistribution\Download`

## Best Practices

1. Always run as Administrator
2. Create System Restore point before cleanup
3. Don't delete files if unsure
4. Restart after major cleanup

## Warning
⚠️ Be careful when deleting system files. When in doubt, use built-in Windows tools instead of manual deletion.
# Modal

Raw implementation of something above everything else

```
Modal

Dialog = extends Modal
AlertDialog = extends Dialog

IDrawer = extends Modal
Drawer = MobileDrawer | DesktopDrawer 
MobileDrawer implements IDrawer
DesktopDrawer implements IDrawer

ActionSheet = extends Drawer

````

# Variants

## Dialog

### VanillaDialog

### AlertDialog

## Drawer

### Drawer (Mobile)

### Drawer (Desktop)

### ActionSheet Drawer


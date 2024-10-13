'use client'

import { useState, useEffect, useCallback } from 'react'
import { Moon, Sun, Play, Share2, Save, FileCode2, Plus, Trash2, Copy, Edit2, Maximize2, Minimize2, Code2, Settings, HelpCircle, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

export default function PremiumCompiler() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [language, setLanguage] = useState('python')
  const [fileName, setFileName] = useState('main.py')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [activeTab, setActiveTab] = useState('editor')
  const [files, setFiles] = useState([{ name: 'main.py', content: '' }])
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const { toast } = useToast()

  const languages = {
    python: { name: 'Python', extension: 'py', sampleCode: 'print("Hello, World!")' },
    java: { name: 'Java', extension: 'java', sampleCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
    c: { name: 'C', extension: 'c', sampleCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
    javascript: { name: 'JavaScript', extension: 'js', sampleCode: 'console.log("Hello, World!");' },
    ruby: { name: 'Ruby', extension: 'rb', sampleCode: 'puts "Hello, World!"' },
  }

  useEffect(() => {
    setCode(languages[language].sampleCode)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [language, theme])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      return newTheme
    })
    toast({
      title: `Theme changed to ${theme === 'dark' ? 'light' : 'dark'}`,
      description: "Your preference has been saved.",
    })
  }

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
    setFileName(`main.${languages[value].extension}`)
    setCode(languages[value].sampleCode)
    toast({
      title: `Language changed to ${languages[value].name}`,
      description: "Sample code has been loaded.",
    })
  }

  const handleRun = useCallback(() => {
    setOutput(`Running ${languages[language].name} code...\n\n// Output:\n${code}\n\n// Execution complete`)
    setActiveTab('output')
    toast({
      title: "Code executed",
      description: "Your code has been run successfully.",
    })
  }, [language, code])

  const handleShare = () => {
    navigator.clipboard.writeText(code).then(() => {
      toast({
        title: "Code shared",
        description: "Your code has been copied to clipboard.",
        action: <ToastAction altText="View">View</ToastAction>,
      })
    })
  }

  const handleSave = () => {
    const updatedFiles = [...files]
    updatedFiles[currentFileIndex].content = code
    setFiles(updatedFiles)
    toast({
      title: "Code saved",
      description: `Your code has been saved to ${fileName}`,
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleRun()
    }
  }

  const addNewFile = () => {
    const newFileName = `file${files.length + 1}.${languages[language].extension}`
    setFiles([...files, { name: newFileName, content: '' }])
    setCurrentFileIndex(files.length)
    setFileName(newFileName)
    setCode('')
    toast({
      title: "New file created",
      description: `${newFileName} has been added to your project.`,
    })
  }

  const deleteFile = (index: number) => {
    if (files.length > 1) {
      const updatedFiles = files.filter((_, i) => i !== index)
      setFiles(updatedFiles)
      setCurrentFileIndex(0)
      setFileName(updatedFiles[0].name)
      setCode(updatedFiles[0].content)
      toast({
        title: "File deleted",
        description: `${files[index].name} has been removed from your project.`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Cannot delete file",
        description: "You must have at least one file in your project.",
        variant: "destructive",
      })
    }
  }

  const renameFile = (index: number, newName: string) => {
    const updatedFiles = [...files]
    updatedFiles[index].name = newName
    setFiles(updatedFiles)
    if (index === currentFileIndex) {
      setFileName(newName)
    }
    toast({
      title: "File renamed",
      description: `File has been renamed to ${newName}`,
    })
  }

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Code2 className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                ProTool Compiler
              </span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="/">
                Home
              </a>
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="/docs">
                Documentation
              </a>
              <a className="transition-colors hover:text-foreground/80 text-foreground" href="/examples">
                Examples
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languages).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={toggleFullScreen}>
                    {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFullScreen ? 'Exit Full Screen' : 'Enter Full Screen'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">user</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className={`flex-1 flex ${isFullScreen ? 'flex-col' : ''}`}>
        {!isFullScreen && (
          <aside className="w-64 border-r bg-muted p-4">
            <h2 className="text-lg font-semibold mb-4">Files</h2>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="flex-1 justify-start"
                      onClick={() => {
                        setCurrentFileIndex(index)
                        setFileName(file.name)
                        setCode(file.content)
                      }}
                    >
                      <FileCode2 className="h-5 w-5 mr-2" />
                      <span className="truncate">{file.name}</span>
                    </Button>
                    <div className="flex">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Rename File</DialogTitle>
                            <DialogDescription>
                              Enter a new name for the file.
                            </DialogDescription>
                          </DialogHeader>
                          <Input
                            defaultValue={file.name}
                            onChange={(e) => renameFile(index, e.target.value)}
                          />
                          <DialogFooter>
                            <Button onClick={() => {}}>Save</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" onClick={() => deleteFile(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button className="w-full mt-4" onClick={addNewFile}>
              <Plus className="mr-2 h-4 w-4" /> New File
            </Button>
          </aside>
        )}
        <main className={`flex-1 flex flex-col ${isFullScreen ? 'h-[calc(100vh-8rem)]' : ''}`}>
          <div className="flex-1 p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="output">Output</TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="flex-1 mt-0">
                <Textarea
                  className="w-full h-full min-h-[calc(100vh-16rem)] font-mono resize-none p-4"
                  placeholder="Write your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </TabsContent>
              <TabsContent value="output" className="flex-1 mt-0">
                <Card className="h-full">
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-16rem)]">
                      <pre className="p-4 whitespace-pre-wrap">{output}</pre>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            
            </Tabs>
          </div>
          <footer className="border-t bg-muted p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="filename">File Name:</Label>
                <Input
                  id="filename"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-48"
                />
              </div>
              <div className="space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button onClick={handleRun}>
                        <Play className="mr-2 h-4 w-4" /> Run
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Run code (Ctrl+Enter)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share Your Code</DialogTitle>
                      <DialogDescription>
                        Copy the code below to share with others.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                      <pre className="whitespace-pre-wrap">{code}</pre>
                    </ScrollArea>
                    <DialogFooter>
                      <Button onClick={handleShare}>
                        <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>
            </div>
          </footer>
        </main>
      </div>
      <footer className="border-t bg-muted py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              ProTool
            </a>
            . The source code is available on{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
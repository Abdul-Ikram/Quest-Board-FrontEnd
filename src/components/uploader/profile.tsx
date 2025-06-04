import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

export default function UploaderProfilePage() {
  return (
    <div className="p-4 md:p-8 w-full mx-auto space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">My Profile</h1>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-4 md:p-6 flex flex-col md:flex-row gap-4 md:items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src="https://ui.shadcn.com/avatars/02.png"
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Natashia Khaleira</h2>
            <p className="text-sm text-muted-foreground">Admin</p>
            <p className="text-sm text-muted-foreground">Leeds, United Kingdom</p>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Personal Information</h3>
            <Button variant="default" size="sm" className="flex items-center gap-1">
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">First Name</Label>
              <p>Natashia</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Last Name</Label>
              <p>Khaleira</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Date of Birth</Label>
              <p>12-10-1990</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email Address</Label>
              <p>info@binary-fusion.com</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Phone Number</Label>
              <p>(+62) 821 2554-5846</p>
            </div>
            <div>
              <Label className="text-muted-foreground">User Role</Label>
              <p>Admin</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Address</h3>
            <Button variant="default" size="sm" className="flex items-center gap-1">
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Country</Label>
              <p>United Kingdom</p>
            </div>
            <div>
              <Label className="text-muted-foreground">City</Label>
              <p>Leeds, East London</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Postal Code</Label>
              <p>ERT 1254</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
